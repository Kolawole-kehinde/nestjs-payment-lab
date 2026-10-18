import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service.js";



@Controller('payment')
export class PaymentsController {
     constructor(
        private readonly paymentService: PaymentsService
     ) {}

     @Post()
     createPayment(@Body('amount') amount: number) {
        return this.paymentService.createPayment(amount)
     }
}