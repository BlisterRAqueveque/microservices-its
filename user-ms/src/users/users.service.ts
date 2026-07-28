import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { CatchErrorService } from 'src/errors/catch-error.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly catchErrorService: CatchErrorService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      this.catchErrorService.throwException(error, 'userService', 'create');
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.user.findMany({
        where: { deleted: false },
      });

      return data;
    } catch (error) {
      this.catchErrorService.throwException(error, 'userService', 'findAll');
    }
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id, deleted: false } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number, owner: User) {
    return this.prisma.user.update({
      where: { id },
      data: { deleted: true, deletedAt: new Date(), userId: owner.id },
    });
  }
}
