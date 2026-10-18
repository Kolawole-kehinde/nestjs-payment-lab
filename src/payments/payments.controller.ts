import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service.js";



@Controller('payments')
export class PaymentsController {
     constructor(
        private readonly paymentService: PaymentsService
     ) {}

     @Post()
     createPayment(@Body('amount') amount: number) {
        return this.paymentService.createPayment(amount)
     }
}