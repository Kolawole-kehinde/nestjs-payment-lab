import { BadRequestException, Injectable } from "@nestjs/common";
import { PaymentsService } from "../payments/payments.service.js";



@Injectable()
export class TransferService {
     constructor(
        private readonly paymentService: PaymentsService,
     ) {}


     initiateTransfer(amount: number) {
        if(amount > 1000000){
            throw new BadRequestException(
                'Transfer amount cannot exceed 1,000,000'
            )
        }
       return this.paymentService.createPayment(amount)
     }
}