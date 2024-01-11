import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { User } from 'src/Entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private repo: Repository<User>,
                private jwt: JwtService){
    }

    async registerUser(registerDTO: RegisterUserDto){
       // return registerDTO;
        const{email, password} = registerDTO;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);
        //console.log(salt);

        const user = new User();
        user.email = email;
        user.password = hashed;
        user.salt = salt;
        user.money = 0;

        this.repo.create(user);
        try{
            return await this.repo.save(user);
        } catch (err){
            throw new InternalServerErrorException('Something went wrong, uesr was not created');
        }
        

    }

    async loginUser(userLoginDTO: UserLoginDto){
        const {email, password} = userLoginDTO;
        const user = await this.repo.findOne({ where: { email: email } });

        if (!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const salt =  user.salt;
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(isPasswordMatch){
            //return {message: 'LoginSuccsessful'}
            const jwtPayload = {email};
            const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'});
            return {token: jwtToken};
        }else{
            throw new UnauthorizedException('Invalid credentials');
        }

    }

    async getUserIdByEmail(email: string): Promise<number | null> {
        const user = await this.repo.findOne({ where: { email: email } });

        if (user) {
            return user.id;
        }
        return null;
    }

    async getMoneyByEmail(email: string){
        const user = await this.repo.findOne({ where: { email: email } });

        if (user) {
            return user.money;
        }
        return null;
    }

    async getMoneyById(id: number){
        const user = await this.repo.findOne({ where: { id: id } });

        if (user) {
            return user.money;
        }
        return null;
    }

    async addMoneyByEmail(email: string, amount: number): Promise<number | null> {
        const user = await this.repo.findOne({ where: { email: email } });
    
        if (user) {
            user.money += amount;
    
            try {
                await this.repo.save(user);
                return user.money;
            } catch (err) {
                throw new InternalServerErrorException('Failed to add money to the user');
            }
        }
    
        return null;
    }

    async subMoneyById(id: number, amount: number): Promise<number | null> {
        const user = await this.repo.findOne({ where: { id: id } });
    
        if (user) {
            user.money -= amount;
    
            try {
                await this.repo.save(user);
                return user.money;
            } catch (err) {
                throw new InternalServerErrorException('Error');
            }
        }
    
        return null;
    }

    async addMoneyById(id: number, amount: number): Promise<number | null> {
        const user = await this.repo.findOne({ where: { id: id } });
    
        if (user) {
            user.money += amount;
    
            try {
                await this.repo.save(user);
                return user.money;
            } catch (err) {
                throw new InternalServerErrorException('Error');
            }
        }
    
        return null;
    }

}
