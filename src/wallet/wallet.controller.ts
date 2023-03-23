import { Controller, Param, Post, Req, UseGuards,Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { jwtGuard } from '../auth/guards/authguard';
import { FundwalletDto } from './wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(private walletservice:WalletService){
    }

    @UseGuards(jwtGuard)
    @Post("/new/:ownerid")
    async createWallet(@Param("ownerid")ownerid:string, @Req()req){
        return await this.walletservice.createWallet(ownerid)

    }


    @Get("all")
    async findallwallet(){
        return await this.walletservice.findallwallet()
    }

    @Get("trans")
    async findalltransactionst(){
        return await this.walletservice.findalltransactions()
    }


    @UseGuards(jwtGuard)
    @Post("/fund/:walletID")
    async funwallet(@Param("walletID")walletID:string, @Body()fundwalletdto:FundwalletDto){
        const wallet= await this.walletservice.fundwallet(fundwalletdto,walletID)
        return { message: `Wallet funded successfully. }` };
    }

    @UseGuards(jwtGuard)
    @Post("/transfer/:senderid/:recieverid/:amount")
    async transferfuds(@Param("senderid")senderid:string, @Param("recieverid")recieverid:string,@Param("amount")amount:number){
        return await this.walletservice.transfer(senderid,recieverid,amount)
    }


}



