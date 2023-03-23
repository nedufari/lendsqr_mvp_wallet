import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { LoginDto, SignupDto } from './dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Roles } from './compay.enum';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class AuthService {
    constructor( @InjectModel() private readonly knex:Knex, private jwt:JwtService){}


    async hashpassword(password):Promise<string>{
        return bcrypt.hash(password,12)
        
    }

    async verifyPasword(password,hashPassword){
        return bcrypt.compare(password, hashPassword)
    }

  async signup(signupdto:SignupDto){

    try {
        const hash= this.hashpassword(signupdto.password)
        const uuid=uuidv4()
        const existing_user = await this.knex.table("company").where("email",signupdto.email).first()

        if (existing_user){
            throw new HttpException(`user with email ${signupdto.email} already exist please use a new email`,HttpStatus.CONFLICT)
        }
        
    
        const [userid] = await  this.knex.table("company").insert({
            companyName:signupdto.companyName,
            password:(await hash).toString(),
            email:signupdto.email,
            companyID:uuid,
            roles:Roles.MASTER
        })

        const user = await this.knex.table("company").where("companyID", userid).first()
       
        console.log(user)
        return user
        
    } catch (error) {
        throw error     
    }
    }

    async doesPasswordMatch(password:string, hashpassword:string):Promise<boolean>{ 
        return await this.verifyPasword(password, hashpassword)
        
    }


   async validateuser(email:string, password:string){
        const user =await this.knex.table("company").where("email", email).first()
        
       if (!user) return null

        const doesPasswordMatch= await this.doesPasswordMatch(password,user.password)
        if(!doesPasswordMatch) return null
        return user

    }

    async login (logindto:LoginDto):Promise<{token:string}>{
        const {email, password}= logindto
        const user = await this.validateuser(email,password)
        if (!user) throw new HttpException(`credentials invalid `, HttpStatus.UNAUTHORIZED)
        const jwt =await this.jwt.signAsync({user})
        return {token:jwt}
    }


    ///find one company

    async findallwallet(){
        return await this.knex("company")

    }


}
