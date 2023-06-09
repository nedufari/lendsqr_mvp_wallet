import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './authstrategy';
import { jwtGuard } from './guards/authguard';
import { RoleGuard } from './guards/roleguard';

@Module({
  imports:[JwtModule.registerAsync({
    useFactory:()=>({
      secret:'YOUR_SECRET_OR_KEY_HERE',
      signOptions:{expiresIn:'259200s'}
    })
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,jwtGuard,RoleGuard],
  exports:[AuthService]
})
export class AuthModule {}
