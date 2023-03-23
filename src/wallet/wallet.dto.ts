import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Currency, Payment_Method } from "../transactions/transaction.enum";

export class FundwalletDto{
    @IsNumber()
    @IsNotEmpty()
    amount:number

    @IsOptional({message:"this wallet only allows transfers"})
    @IsEnum({})
    payment_method:Payment_Method.TRANSFER

    @IsEnum({})
    @IsOptional()
    currency:Currency.NGR

    

}