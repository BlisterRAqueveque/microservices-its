import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USER_MS } from 'src/config';

@Module({
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      {
        name: USER_MS,
        transport: Transport.TCP,
        options: { port: envs.USER_MS_PORT, host: envs.USER_MS_HOST },
      },
      {
        name: 'AVATAR-MS',
        transport: Transport.TCP,
        options: { port: 3001, host: 'localhost' },
      },
      {
        name: 'LOGS-MS',
        transport: Transport.TCP,
        options: { port: 3002, host: 'localhost' },
      },
      {
        name: 'AUTH-MS',
        transport: Transport.TCP,
        options: { port: 3003, host: 'localhost' },
      },
    ]),
  ],
})
export class UsersModule {}
