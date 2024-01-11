import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "@nestjs/class-validator";

export class RegisterUserDto{
     
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).*$/, {
        message: "Password is too weak, choose a stronger password"
    })
    password: string;
}