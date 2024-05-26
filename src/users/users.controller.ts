import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserOtpDto } from './dto/create-user-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('generate-otp')
  async generateOtp(@Body() createUserOtpDto: CreateUserOtpDto) {
    const user = await this.usersService.findByEmail(createUserOtpDto.email);
    if (user) {
      await this.usersService.generateOtp(user.id);
    }
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const user = await this.usersService.findByEmail(verifyOtpDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isValidOtp = await this.usersService.verifyOtp(
      user.id,
      verifyOtpDto.otp,
    );
    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return this.usersService.login(user);
  }
}

// c:\Users\HP\Real-Estate-Platform\real-estate-platform\src\users\users.controller.ts
