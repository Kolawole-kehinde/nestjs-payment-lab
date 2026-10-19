import { IsNumber, IsPositive} from "class-validator";


export class CreateTransferDto {
    @IsNumber({allowInfinity: false, allowNaN: false})
    @IsPositive()
    amount: number
}