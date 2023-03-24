import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { AuthService } from '../auth/auth.service';
import { Currency, Payment_Method, TransactionType } from '../transactions/transaction.enum';
import { FundwalletDto } from './wallet.dto';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class WalletService {
    constructor(@InjectModel() private readonly knex:Knex){}

    

    async createWallet(ownerID:string){

        try {
        const uuid=uuidv4()
        // const user = await this.knex.table("company").where("companyID",ownerID).first()
        // if (!user) throw new HttpException(`the companyID does not  match the logged in company ${ownerID}`,HttpStatus.UNAUTHORIZED)

        const newWallet = await this.knex("wallet").insert({
            wallet_address:uuid,
            currency:Currency.NGR,
            payment_Method:Payment_Method.TRANSFER,
            owner_id:ownerID,
        })
        .join("company","company.companyID","=","wallet.owner_id")
        .select("wallet.*","company.email")
        if (!newWallet || newWallet.length === 0) {
            throw new HttpException(`Failed to create wallet for company ${ownerID}`, HttpStatus.UNAUTHORIZED)
          }
      
        //   const wallet = await this.knex.table("wallet").where("wallet_address", newWallet).first()
        //   console.log(wallet)
          return newWallet 
        
            
        } catch (error) {
            throw error
            
        }        

    }


    async findone(wallet_address:string){
        return await this.knex("wallet").where({wallet_address}).first()
    }

    async findcompany(companyID:string){
        return await this.knex("company").where({companyID}).first()
    }


    async transfer(senderID:string, recieverID:string, amount:number){
       const senderCompany= await this.findone(senderID)
       if (!senderCompany) throw new HttpException(`the companyID does not match any entry in our records`, HttpStatus.NOT_FOUND)
       if (senderCompany.balance < amount) throw new HttpException(`insufficient balance for the transaction `, HttpStatus.NOT_ACCEPTABLE)

       const destinationCompany = await this.findone(recieverID)
       if (!destinationCompany) throw new HttpException(`the companyID does not match any entry in our records`, HttpStatus.NOT_FOUND)

       //check for transfertype and also currency

       if (senderCompany.currency != destinationCompany.currency && senderCompany.payment_mathod != destinationCompany.payment_mathod) {
            throw new HttpException(`the transaction could not be completed because due the payment method or the currency sent ot acceptable by the reciever account, please verify and try again`, HttpStatus.FORBIDDEN)

       }

   
        //perform transfer 
       const transferResult= this.knex.transaction(async (trx) =>{

        //update sender balance
        const updatesender =await trx("wallet")
        .where("wallet_address",senderID)
        .decrement("balance",amount)
        
        

         //update reciever balance
         const updatereciever =await trx("wallet")
         .where("wallet_address",recieverID)
         .increment("balance",amount)
         
        
        //store transactions in transaction table
        const transaction=await trx("transactions").insert({
            trasaction_type:TransactionType.transfer,
            amount:amount,
            recieverID:recieverID,
            senderUUID:senderID,
            currency:Currency.NGR,
            payment_method:Payment_Method.TRANSFER,
            withdrawalID:null,
            transaction_time:new Date()

        })

         return [updatesender, updatereciever, transaction]

        
       })

       return transferResult
       
    }


    async fundwallet(fundwalletdto:FundwalletDto,  reciever:string, ){
        try {
            //find the wallet first
            const wallet= await this.knex.table("wallet").where("wallet_address",reciever).first()
            if (!wallet) throw new HttpException(`invalid wallet address `, HttpStatus.NOT_FOUND)

            const [fundaccount] = await this.knex.transaction(async (trx)=>{

                //update reciever balance 
                const recieverbalanceupdate= await trx("wallet")
                .where("wallet_address", reciever)
                .increment("balance",fundwalletdto.amount)
                .returning("*")


                  //store transactions in transaction table
            const transaction=await trx("transactions").insert({
            trasaction_type:TransactionType.fund,
            amount:fundwalletdto.amount,
            recieverID:reciever,
            // senderUUID:null,
            currency:Currency.NGR,
            payment_method:Payment_Method.DEPOSIT,
            // withdrawalID:null,
            transaction_time:new Date()

        })
                

                return [recieverbalanceupdate,transaction]

            })
            return fundaccount
            
            
        } catch (error) {
            throw error
            
        }

    }

    async withdrawlfunds(withdrawerID:string, amount :number){

        try {
            const wallet= await this.knex("wallet").where("wallet_address",withdrawerID).first()
        if (!wallet) throw new HttpException (`wallet adress not found`,HttpStatus.UNAUTHORIZED)
        if (amount > wallet.balance && wallet.balance===0) throw new HttpException("insufficient balance, transaction canot go through",HttpStatus.FORBIDDEN)


        const withdraw= await this.knex.transaction( async (trx)=>{
            const updatewallet = await trx("wallet").where("wallet_address", withdrawerID).decrement("balance",amount).returning("*")

            const updatetransactiontable= await this.knex("transactions").insert({
                trasaction_type:TransactionType.withdrawal,
                amount:amount,
                withdrawalID:withdrawerID,
                currency:Currency.NGR,
                payment_method:Payment_Method.WITHDRAW,
                // recieverID:null,
                // senderID:null,
                transaction_time:new Date()
    
            })
            return [updatetransactiontable]
            
        })
        return withdraw
            
        } catch (error) {
            throw error
            
        }
        

      
        


    }


    async findallwallet(){
        return await this.knex("wallet")

    }

    async findalltransactions(){
        return await this.knex("transactions")

    }
}
