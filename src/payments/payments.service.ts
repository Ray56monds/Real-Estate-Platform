import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { InjectStripe } from '@nestjs/stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createPayment(createPaymentDto: CreatePaymentDto, userId: number) {
    const { amount, currency, source, description } = createPaymentDto;

    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe amount is in cents
      currency,
      payment_method: source,
      description,
      confirm: true,
      metadata: { userId: userId.toString() },
    });

    return paymentIntent;
  }
}
