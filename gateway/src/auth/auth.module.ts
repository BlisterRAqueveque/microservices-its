import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs, USER_MS } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ClientsModule.register([
      {
        name: USER_MS,
        transport: Transport.TCP,
        options: { port: envs.USER_MS_PORT, host: envs.USER_MS_HOST },
      },
    ]),
    JwtModule.register({
      secret: envs.SEED,
      signOptions: { expiresIn: '8h' },
    }),
  ],
})
export class AuthModule {}
