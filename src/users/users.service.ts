import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { NiraService } from '../nira/nira.service';
import { OtpService } from '../otp/otp.service';
import { CreateUserOtpDto } from './dto/create-user-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private niraService: NiraService,
    private otpService: OtpService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isNationalIdValid = await this.niraService.verifyNationalId(
      createUserDto.nationalId,
      createUserDto.dateOfBirth,
    );

    if (!isNationalIdValid) {
      throw new BadRequestException('Invalid national ID details');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async generateOtp(userId: number): Promise<void> {
    await this.otpService.generateOtp(userId);
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    return this.otpService.verifyOtp(userId, otp);
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async handleGenerateOtp(createUserOtpDto: CreateUserOtpDto): Promise<void> {
    const user = await this.findByEmail(createUserOtpDto.email);
    if (user) {
      await this.generateOtp(user.id);
    }
  }

  async handleVerifyOtp(
    verifyOtpDto: VerifyOtpDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.findByEmail(verifyOtpDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isValidOtp = await this.verifyOtp(user.id, verifyOtpDto.otp);
    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return this.login(user);
  }
}
