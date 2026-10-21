
import { Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { TransferService } from './transfers.service.js';
import { CreateTransferDto } from './dto/create-transfer.dto.js';
import { AuthGuard } from './guards/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../auth/role.enum.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/authenticated-user.interface.js';

@Controller('transfers')
@UseGuards(AuthGuard, RolesGuard)
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) {}

  @Post()
  initiateTransfer(@Body() dto: CreateTransferDto) {
    return this.transferService.initiateTransfer(dto.amount);
  }

  @Post('Admin-test')
 @Roles(Role.ADMIN)
  adminTest() {
    return {
      message: 'Welcome, Admin',
    };
  };

  @Get('me')
  getCurrentUser(@CurrentUser() user: AuthenticatedUser){
    return user
  }
}
