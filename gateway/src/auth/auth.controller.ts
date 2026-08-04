import {
  Body,
  Controller,
  HttpException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() credenciales) {
    return this.authService.login(credenciales);
  }

  @Public()
  @Post('register')
  register() {
    return {};
  }
}
