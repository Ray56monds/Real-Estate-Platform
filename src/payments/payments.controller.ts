import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto, @Req() req) {
    const userId = req.user.id;
    return this.paymentsService.createPayment(createPaymentDto, userId);
  }
}
