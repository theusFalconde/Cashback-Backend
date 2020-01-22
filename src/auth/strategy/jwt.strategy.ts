import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JwtConstante } from '../constant/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstante.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.authService.validateUserByJwt(payload);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
