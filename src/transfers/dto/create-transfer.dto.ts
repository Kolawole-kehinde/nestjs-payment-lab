import { IsNumber, IsPositive } from "class-validator";


export class CreateTransferDto {
    @IsNumber()
    @IsPositive()
    amount: number
}