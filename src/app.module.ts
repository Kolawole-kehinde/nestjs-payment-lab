
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentModule } from './payments/payments.module.js';
import { TransferModule } from './transfers/transfers.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MAX_TRANSFER_AMOUNT: Joi.number()
          .positive()
          .required(),
      }),
    }),
    PaymentModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
