import { Get } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService){}

    @Post("/signup")
    async signup(@Body()signupdto:SignupDto){
        return await this.authservice.signup(signupdto)
    }

    @Post('/login')
    async login(@Body()logindto:LoginDto):Promise<{token:string}>{
        return await this.authservice.login(logindto)
    }

    @Get("/all")
    async gettallcompany(){
        return await this.authservice.findallwallet()
    }
}
