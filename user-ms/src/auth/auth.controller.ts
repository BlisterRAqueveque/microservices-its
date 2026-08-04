import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CredencialesDto } from './dto/credenciales.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ auth: 'login' })
  login(@Payload() credenciales: CredencialesDto) {
    return this.authService.login(credenciales);
  }

  @MessagePattern({ auth: 'register' })
  register(@Payload() newUser: CreateUserDto) {
    return this.authService.register(newUser);
  }
}
