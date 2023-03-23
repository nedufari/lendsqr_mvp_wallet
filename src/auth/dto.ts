import {IsString,IsEmail,IsNotEmpty,MinLength } from "class-validator"

export class SignupDto{

    @IsString()
    companyName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @MinLength(8)
    password:string

}

export class LoginDto{

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    password:string
}