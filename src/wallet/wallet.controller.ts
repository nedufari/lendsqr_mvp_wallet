import { Controller, Param, Post, Req, UseGuards,Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { Roles } from '../auth/compay.enum';
import { jwtGuard } from '../auth/guards/authguard';
import { RoleGuard } from '../auth/guards/roleguard';
import { Role } from '../auth/guards/roles.decorator';
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
    async findalltransactions(){
        return await this.walletservice.findalltransactions()
    }


    @UseGuards(jwtGuard)
    @Role(Roles.MASTER)
    @Post("/fund/:walletID")
    async fundwallet(@Param("walletID")walletID:string, @Body()fundwalletdto:FundwalletDto){
        const wallet= await this.walletservice.fundwallet(fundwalletdto,walletID)
        return { message: `Wallet funded successfully. }` };
    }

    @UseGuards(jwtGuard)
    @Role(Roles.COMPANY)

    @Post("/transfer/:senderid/:recieverid/:amount")
    async transferfunds(@Param("senderid")senderid:string, @Param("recieverid")recieverid:string,@Param("amount")amount:number){
        const transfer= await this.walletservice.transfer(senderid,recieverid,amount)
        return {message:`the transfer of the sum of ${amount} NGR from ${senderid} to ${recieverid} is successful`}
    }

    @Post("/withdraw/:withdrawerID/:amount")
    async withdraw(@Param("withdrawerID")withdrawerId:string, @Param("amount")amount:number){
        const withdraw = await this.walletservice.withdrawlfunds(withdrawerId,amount)
        return {message:`you have successfully withdrawn ${amount} NGR`}
    }


}



