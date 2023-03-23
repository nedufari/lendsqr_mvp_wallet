import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}

