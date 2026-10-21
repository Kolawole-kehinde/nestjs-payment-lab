
import { Body, Controller, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import { TransferService } from './transfers.service.js';
import { CreateTransferDto } from './dto/create-transfer.dto.js';
import { AuthGuard } from './guards/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../auth/role.enum.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/authenticated-user.interface.js';
import { CurrentRole } from '../auth/current-role.decorator.js';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor.js';
import { TransformResponseInterceptor } from '../common/interceptors/transform-response.interceptor.js';


@UseInterceptors(ResponseTimeInterceptor)
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

  @UseInterceptors(TransformResponseInterceptor)
  @Get('me')
  getCurrentUser(@CurrentUser() user: AuthenticatedUser){
    return {
        id: user.sub,
        role: user.role
    }
  };

  @Get('my-role')
  getCurrentRole(@CurrentRole() role:Role){
    return {role}
  };

//   @Get('test-server-error')
// testServerError() {
//   throw new Error('Database connection failed: internal details');
// }
}
