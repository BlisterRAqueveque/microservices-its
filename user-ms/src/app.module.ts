import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CatchErrorModule } from './errors/catch-error.module';
import { AuthModule } from './auth/auth.module';

@Module({ imports: [UsersModule, PrismaModule, CatchErrorModule, AuthModule] })
export class AppModule {}
