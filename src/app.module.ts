import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config"
import {KnexModule} from "nest-knexjs"
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
  KnexModule.forRoot({
    config:{
      client:"mysql",
      version:"5",
      useNullAsDefault:true,
      connection:{
        // host:process.env.databasehost,
        password:'@nedupoetry98654449' ,
        database:'mvpwallet',
        port:3306,
        host:"127.0.0.1",
        user:"root"
      }
    }
  }),
  AuthModule,
  WalletModule,
       
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
