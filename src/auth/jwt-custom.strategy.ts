import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/Entity/User";
import { Repository } from "typeorm";

export class JwtCustomStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private repo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'dcnjwnedJHH2jBH1267BJgf63dgyedjnue'
        });
    }

    async validate(payload: {email: string}){
        const {email} = payload;
        const user = await this.repo.findOne({ where: { email: email } });

        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}