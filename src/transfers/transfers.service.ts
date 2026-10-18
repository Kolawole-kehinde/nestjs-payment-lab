import { Injectable } from "@nestjs/common";
import { PaymentsService } from "../payments/payments.service.js";



@Injectable()
export class TransferService {
     constructor(
        private readonly paymentService: PaymentsService,
     ) {}


     initiateTransfer(amount: number) {
       return this.paymentService.createPayment(amount)
     }
}