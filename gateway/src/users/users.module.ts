import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, USER_MS } from 'src/config';
import { MulterModule } from '@nestjs/platform-express';
import { saveImagesToStorage } from 'src/common/helpers/image-storage';

const { fileFilter, storage } = saveImagesToStorage('avatar');

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
        name: 'LOGS-MS',
        transport: Transport.TCP,
        options: { port: 3002, host: 'localhost' },
      },
      {
        name: 'LOGS-MS',
        transport: Transport.TCP,
        options: { port: 3002, host: 'localhost' },
      },
      {
        name: 'ATTACH-MS',
        transport: Transport.TCP,
        options: { port: envs.ATTACH_MS_PORT, host: envs.ATTACH_MS_HOST },
      },
    ]),
    MulterModule.register({
      dest: './uploads',
      fileFilter,
      storage,
    }),
  ],
})
export class UsersModule {}
