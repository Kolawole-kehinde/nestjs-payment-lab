
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from '../payments/payments.service.js';

@Injectable()
export class TransferService {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) {}

  initiateTransfer(amount: number) {
    const maxAmount = Number(
        this.configService.get<string>(
            'MAX_TRANSFER_AMOUNT'
        )
    )

    if (maxAmount === undefined || amount > maxAmount) {
      throw new BadRequestException(
        'Transfer amount exceeds the allowed limit',
      );
    }

    return this.paymentsService.createPayment(amount);
  }
}
