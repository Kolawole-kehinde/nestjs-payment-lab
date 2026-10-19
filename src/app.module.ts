import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentModule } from './payments/payments.module.js';
import { TransferModule } from './transfers/transfers.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
 
   imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PaymentModule, 
    TransferModule
   ],
   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
