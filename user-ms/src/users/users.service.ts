import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CatchErrorService } from 'src/errors/catch-error.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly catchErrorService: CatchErrorService,
  ) {}

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
      data: { deleted: true, deletedAt: new Date() },
    });
  }

  cambiarContraseña(owner: User, password: string) {
    //
    
  }
}
