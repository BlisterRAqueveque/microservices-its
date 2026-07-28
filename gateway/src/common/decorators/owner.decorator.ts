import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Owner = createParamDecorator(
  // Tomamos el contexto
  (data: unknown, context: ExecutionContext) => {
    // Del contexto sacamos la request
    const request = context.switchToHttp().getRequest();
    // De la request sacamos el usuario
    return request.user;
  },
);
