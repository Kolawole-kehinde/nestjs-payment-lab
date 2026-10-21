
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentModule } from './payments/payments.module.js';
import { TransferModule } from './transfers/transfers.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module.js';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware.js';

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
    AuthModule,
    PaymentModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(RequestLoggingMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod
        .ALL });
    }
}


//What this does:
//- implements NestModule lets your module configure middleware.
//- apply() selects the middleware to run.
//- forRoutes() applies it to all HTTP routes, including different request methods.

