import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Constants } from 'src/config/Constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Constants.jwt,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}