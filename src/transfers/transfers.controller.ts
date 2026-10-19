
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransferService } from './transfers.service.js';
import { CreateTransferDto } from './dto/create-transfer.dto.js';
import { AuthGuard } from './guards/auth.guard.js';

@Controller('transfers')
@UseGuards(AuthGuard)
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) {}

  @Post()
  initiateTransfer(@Body() dto: CreateTransferDto) {
    return this.transferService.initiateTransfer(dto.amount);
  }
}
