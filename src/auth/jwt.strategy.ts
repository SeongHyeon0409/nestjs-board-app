import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'secretKey1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

  } 

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if(!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}