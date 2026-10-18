import { Injectable } from "@nestjs/common";
import { PaymentProvider } from "./payment-provider.interface.js";
import { randomUUID } from "crypto";


@Injectable()

export class MockProviderPayment implements PaymentProvider {
     async createPayment(amount: number) {
          return {
            reference: randomUUID(),
            status: 'pending',
            amount,
          }
     }
}