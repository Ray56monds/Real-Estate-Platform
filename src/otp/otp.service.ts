import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService) {}

  async generateOtp(userId: number): Promise<void> {
    // Generate OTP and save it to the database
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.otp.create({
      data: {
        otp,
        userId,
        expiresAt: new Date(Date.now() + 10 * 60000), // 10 minutes from now
      },
    });

    // Send OTP to the user, e.g., via SMS or email
    console.log(`OTP for user ${userId}: ${otp}`);
  }

  async verifyOtp(userId: number, otp: string): Promise<boolean> {
    const record = await this.prisma.otp.findFirst({
      where: {
        userId,
        otp,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    return !!record;
  }
}
