
import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfers.service.js';
import { CreateTransferDto } from './dto/create-transfer.dto.js';

@Controller('transfers')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) {}

  @Post()
  initiateTransfer(@Body() dto: CreateTransferDto) {
    return this.transferService.initiateTransfer(dto.amount);
  }
}
