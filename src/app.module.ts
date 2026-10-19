
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentModule } from './payments/payments.module.js';
import { TransferModule } from './transfers/transfers.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MAX_TRANSFER_AMOUNT: Joi.number()
          .positive()
          .required(),
          JWT_SECRET: Joi.string().min(32).required(),
      }),
      
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {expiresIn: '15m'}
      })

    }),
    PaymentModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
