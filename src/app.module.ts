import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 9eee5c7e53e86a59d81ce729a7c6878aabe0ada6
})
export class AppModule {}
