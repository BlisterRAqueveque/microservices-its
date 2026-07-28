import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login() {
    return 'JWT';
  }

  @Public()
  @Post('register')
  register() {
    return {};
  }
}
