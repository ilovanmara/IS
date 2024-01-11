import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
        
    }

    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegisterUserDto){
        return this.authService.registerUser(regDTO);
    }

    @Post('login')
    signin(@Body(ValidationPipe) loginDTO: UserLoginDto){
        return this.authService.loginUser(loginDTO);
    }

    @Get('money/:email')
    getMoneyIdByEmail(@Param('email') email: string){
        return this.authService.getMoneyByEmail(email);
    }

    @Get(':email')
    getUserIdByEmail(@Param('email') email: string){
        return this.authService.getUserIdByEmail(email);
    }

    @Patch(':email')
    addMoneyByEmail(@Param('email') email: string, @Body('amount') amount: number){
        return this.authService.addMoneyByEmail(email, amount);
    }
}
