import { Currency } from "../transactions/transaction.enum";

export interface WalletInterface{
    address:string,
    balance:number,
    currency:Currency.GBR,
    
}