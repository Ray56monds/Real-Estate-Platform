import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { NiraModule } from './nira/nira.module';
import { OtpModule } from './otp/otp.module';
import { ConfigAppModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    NiraModule,
    OtpModule,
    ConfigAppModule,
  ],
})
export class AppModule {}
