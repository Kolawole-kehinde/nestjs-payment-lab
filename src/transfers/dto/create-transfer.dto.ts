import { IsNumber, IsPositive, Max } from "class-validator";


export class CreateTransferDto {
    @IsNumber({allowInfinity: false, allowNaN: false})
    @IsPositive()
    @Max(1000000)
    amount: number
}