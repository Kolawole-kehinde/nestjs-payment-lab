
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { MockProviderPayment } from './mock-payment.provider.js';
import { PAYMENT_PROVIDER } from './payment-provider.token.js';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: PAYMENT_PROVIDER,
      useClass: MockProviderPayment,
    },
  ],
  exports: [PaymentsService],
})
export class PaymentModule {}
