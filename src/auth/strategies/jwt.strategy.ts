import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/config/constants";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){ //clase que hereda la estrategia de passportStrategy
    constructor(
        private userService: UserService,
        private config: ConfigService
    ) {
        super({ //configuracines
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(JWT_SECRET)
        });
    }

    async validate(payload: any){
        const {sub: id} = payload; //aqui se extrae unicamente el id 
        return await this.userService.getOne(id); //si existe el identificador se ejecuta esta peticion
    }
}

