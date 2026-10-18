
import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfers.service.js';

@Controller('transfers')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) {}

  @Post()
  initiateTransfer(@Body('amount') amount: number) {
    return this.transferService.initiateTransfer(amount);
  }
}
