// export interface Transactions{
//     transaction_ID:string
//     destination_address:string
//     amount:string
//     currency:Currency
//     source_address:string,
//     trasaction_Type:TransactionType
//     transaction_Date:Date

// }


export enum Currency{
    GBR="gbr",
    NGR="ngr",
    USD="gbr",

}

export enum Payment_Method{
    WITHDRAW="withdraw",
    TRANSFER="transfer",
    DEPOSIT="deposit"

}

export enum TransactionType{
    transfer="transfer",
    fund="fund",
    withdrawal="withdrawal"
}
