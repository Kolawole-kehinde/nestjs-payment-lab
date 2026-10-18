import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentModule } from './payments/payments.module.js';
import { TransferModule } from './transfers/transfers.module.js';

@Module({
 
   imports: [PaymentModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
