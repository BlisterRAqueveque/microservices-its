import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/config';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // Obtenemos los metadatos de las rutas
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY /* comparamos con la key que creamos */,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      // Y si la ruta tiene ese metadato, lo deja pasar
      return true;
    }

    // Caso contrario, activa el Passport
    return super.canActivate(context);
  }
}
