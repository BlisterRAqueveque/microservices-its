import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, concatMap, map, tap } from 'rxjs';
import { errorCustom } from 'src/common/helpers/error-custom';
import { USER_MS } from 'src/config';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_MS) private readonly userClient: ClientProxy,
    @Inject('AVATAR-MS') private readonly avatarClient: ClientProxy,
    @Inject('LOGS-MS') private readonly logsClient: ClientProxy,
    @Inject('AUTH-MS') private readonly authClient: ClientProxy,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    // const usuario: { id: number; name: string } = await firstValueFrom(
    //   this.userClient.send({ user: 'create' }, user),
    // );

    // usuario.id; // => consulta nueva a otro microservicio

    return this.userClient.send({ user: 'findOne' }, id).pipe(
      map((user: { id: number; name: string; avatar?: string }) => {
        return user;
      }),
      tap((data) => {
        this.createLog(data);
      }), // ==> Enviar un correo
      tap(() => {
        this.sendNotifications();
      }),
      concatMap((user) =>
        this.avatarClient.send({ avatar: 'findOne' }, user.id).pipe(
          map((data: string | null) => ({
            ...user,
            avatar: data ?? 'https://avatar-defecto.com',
          })),
          catchError((err, data) => {
            errorCustom(err);
            return data;
          }),
        ),
      ),
      map((data) => {
        if (!data.avatar) data.avatar = '';
        return data;
      }),
    );
  }

  private sendNotifications() {
    // ACA SE ENVIARIAN LAS NOTIFICACIONES
  }

  private createLog(data: { id: number }) {
    this.logsClient
      .send(
        { create: 'logs' },
        { message: `Se consulto por usuario ${data.id}`, data: new Date() },
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  @Get()
  findAll() {}

  @Post(':id')
  create(@Body() user) {}

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
