
import { Module } from '@nestjs/common';
import { PaymentModule } from '../payments/payments.module.js';
import { TransferService } from './transfers.service.js';
import { TransferController } from './transfers.controller.js';

@Module({
  imports: [PaymentModule],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
