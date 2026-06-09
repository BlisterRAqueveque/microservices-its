import { Global, Module } from '@nestjs/common';
import { CatchErrorService } from './catch-error.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      /** Registrar el ms de logs */
      {
        name: 'LOGS',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3003 },
      },
    ]),
  ],
  providers: [CatchErrorService],
  exports: [CatchErrorService],
})
export class CatchErrorModule {}
