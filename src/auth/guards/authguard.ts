import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jwtGuard extends AuthGuard('jwt'){
    constructor(){
        super()
    }
}