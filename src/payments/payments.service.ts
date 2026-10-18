import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_PROVIDER } from './payment-provider.token.js';
import type { PaymentProvider } from './payment-provider.interface.js';


@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENT_PROVIDER)
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async createPayment(amount: number) {
    return this.paymentProvider.createPayment(amount);
  }
}