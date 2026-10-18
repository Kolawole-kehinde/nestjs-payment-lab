import { Module } from "@nestjs/common";
import { MockProviderPayment } from "./mock-payment.provider.js";
import { PAYMENT_PROVIDER } from "./payment-provider.token.js";
import { PaymentsController } from "./payments.controller.js";
import { PaymentsService } from "./payments.service.js";


@Module({
    controllers: [PaymentsController],
    providers:[
        PaymentsService,
         {
            provide: PAYMENT_PROVIDER,
            useClass: MockProviderPayment
        }
    ]
})

export class PaymentModule {}