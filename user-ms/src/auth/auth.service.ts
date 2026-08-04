import { Injectable } from '@nestjs/common';
import { CredencialesDto } from './dto/credenciales.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login({ username, password }: CredencialesDto) {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user)
      throw new RpcException({ message: 'User not found', statusCode: 401 });

    if (!user.active)
      throw new RpcException({ message: 'User non active', statusCode: 401 });

    const compare = bcrypt.compare(password, user.password);

    if (!compare)
      throw new RpcException({ message: 'Wrong Password', statusCode: 401 });

    const { password: _, ...rest } = user;

    return rest; // => { ...user, password: b$asy$d019u01odiasd };
  }

  register(newUser: CreateUserDto) {
    return `Retornar el usuario nuevo`;
  }
}
