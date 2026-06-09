import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CatchErrorModule } from './errors/catch-error.module';

@Module({ imports: [UsersModule, PrismaModule, CatchErrorModule] })
export class AppModule {}
