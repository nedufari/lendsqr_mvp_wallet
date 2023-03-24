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
      // version:"5",
      useNullAsDefault:true,
      connection:{
        // host:process.env.databasehost,
        database: 'railway',
        user:     'root',
        password: '1C5OoYRLYql1GcM1P7Pm',
        port:6887,
        uri:"mysql://root:1C5OoYRLYql1GcM1P7Pm@containers-us-west-159.railway.app:6887/railway"
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
