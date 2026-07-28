import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { envs } from 'src/config';

interface PayloadInterface {
  // SUB = ID
  sub: number;
}

@Injectable()
// Extendemos la clase de PassportStrategy
export class JwtPassport extends PassportStrategy(Strategy) {
  // Inyectamos el servicio de usuarios
  constructor(private readonly authService: AuthService) {
    super({
      // Extraemos el token del header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Tenemos en cuenta la expiración
      ignoreExpiration: false,
      // Pasamos la firma para validarlo
      secretOrKey: envs.SEED,
    });
  }

  private readonly logger = new Logger('JWT Passport');

  async validate(payload: PayloadInterface) {
    try {
      const user = await firstValueFrom(
        this.authService.getUserInfo(payload.sub),
      );

      if (!user) throw new UnauthorizedException('User not exist');

      // Retornamos el usuario del payload en la request
      return user;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new UnauthorizedException('Invalid token');
    }
  }
}
