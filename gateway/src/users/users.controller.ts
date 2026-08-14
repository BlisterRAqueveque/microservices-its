import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  catchError,
  concatMap,
  firstValueFrom,
  forkJoin,
  map,
  of,
  tap,
} from 'rxjs';
import { Owner } from 'src/common/decorators/owner.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { errorCustom } from 'src/common/helpers/error-custom';
import { USER_MS } from 'src/config';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_MS) private readonly userClient: ClientProxy,
    @Inject('LOGS-MS') private readonly logsClient: ClientProxy,
  ) {}

  @Public()
  @Post('avatar')
  // @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  // @UseInterceptors(FilesInterceptor('files'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Owner() user) {
    // files.forEach((f) => console.log(f));

    if (!file) throw new BadRequestException();
    console.log(file.filename);

    //TODO guardar la referencia en el microservicio de adjuntos
    /**
     * {
     *  imageName:string => file?.filename
     *  userId: string => user.id
     * }
     */
  }
  // GET => https://mi-url.com.ar/api/v1/users/findAll/2/
  @Version('1')
  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    // const usuario: { id: number; name: string } = await firstValueFrom(
    //   this.userClient.send({ user: 'create' }, user),
    // );

    const promesa1 = firstValueFrom(of(undefined)); // ms 500
    const promesa2 = firstValueFrom(of(undefined)); // ms 100
    const promesa3 = firstValueFrom(of(undefined)); // ms 200
    const promesa4 = firstValueFrom(of(undefined)); // ms 300

    // ms 1000

    const promesa5 = firstValueFrom(of(undefined));

    promesa5.then((data) => console.log(data));

    const data = await Promise.all([
      promesa1.then((data) => {
        (data as any).map((data) => data.id);
      }), // ms 500
      promesa2, // ms 100
      promesa3, // ms 200
      promesa4, // ms 300
    ]);

    console.log(data); // ms 500

    const user = await firstValueFrom(this.userClient.send({}, {})); // ms 200
    // const avatar = await firstValueFrom(this.avatarClient.send({}, {})); // ms 100

    // user.avatar = avatar.avatar; // ms 300

    return forkJoin([
      this.userClient.send({}, {}), // ms 200
      // this.avatarClient.send({}, {}), // ms 100
    ]).pipe(
      map((data /** ms 200 */) =>
        // console.log((data[0].avatar = data[1].avatar)),
        {},
      ),
    );

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
      // concatMap(
      //   (user) => {},
      //   // this.avatarClient.send({ avatar: 'findOne' }, user.id).pipe(
      //   //   map((data: string | null) => ({
      //   //     ...user,
      //   //     avatar: data ?? 'https://avatar-defecto.com',
      //   //   })),
      //   //   catchError((err, data) => {
      //   //     errorCustom(err);
      //   //     return data;
      //   //   }),
      //   // ),
      // ),
      map((data) => {
        if (!data.avatar) data.avatar = '';
        return data;
      }),
    );
  }

  // GET => https://mi-url.com.ar/api/vypf/users/
  @Version('shell')
  @Version('ypf')
  @Get()
  async findAllV3(@Param('id') id: string) {
    // const usuario: { id: number; name: string } = await firstValueFrom(
    //   this.userClient.send({ user: 'create' }, user),
    // );

    const promesa1 = firstValueFrom(of(undefined)); // ms 500
    const promesa2 = firstValueFrom(of(undefined)); // ms 100
    const promesa3 = firstValueFrom(of(undefined)); // ms 200
    const promesa4 = firstValueFrom(of(undefined)); // ms 300

    // ms 1000

    const promesa5 = firstValueFrom(of(undefined));

    promesa5.then((data) => console.log(data));

    const data = await Promise.all([
      promesa1.then((data) => {
        (data as any).map((data) => data.id);
      }), // ms 500
      promesa2, // ms 100
      promesa3, // ms 200
      promesa4, // ms 300
    ]);

    console.log(data); // ms 500

    const user = await firstValueFrom(this.userClient.send({}, {})); // ms 200
    // const avatar = await firstValueFrom(this.avatarClient.send({}, {})); // ms 100

    // user.avatar = avatar.avatar; // ms 300

    return forkJoin([
      this.userClient.send({}, {}), // ms 200
      // this.avatarClient.send({}, {}), // ms 100
    ]).pipe(
      map(
        (data /** ms 200 */) => {},
        // console.log((data[0].avatar = data[1].avatar)),
      ),
    );

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
      // concatMap((user) =>
      //   this.avatarClient.send({ avatar: 'findOne' }, user.id).pipe(
      //     map((data: string | null) => ({
      //       ...user,
      //       avatar: data ?? 'https://avatar-defecto.com',
      //     })),
      //     catchError((err, data) => {
      //       errorCustom(err);
      //       return data;
      //     }),
      //   ),
      // ),
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

  // https://mi-url.com.ar/api/v1/users/
  @Version('1')
  @Get()
  findAllV1() {} // data: User[]

  // https://mi-url.com.ar/api/v2/users/
  @Version('2')
  @Get()
  findAllV2() {} // { data: User[], metadata: { actualPage: number, lastPage: number, count: number } }

  /**
   * @description Esta función hace tal y cual
   * @deprecated Now using v2
   * @param user
   * @returns createdUser
   */
  @Version('1')
  @Post()
  create(@Body() user) {
    return this.userClient.send({ user: 'create' }, user);
  }

  @Version('2')
  @Post()
  createConNombreYApellidoObligatorio(@Body() user) {
    if (!user?.name?.trim() || !user?.lastName?.trim())
      throw new BadRequestException('Faltan parámetros');
    return this.userClient.send({ user: 'create' }, user);
  }

  @Version('3')
  @Post()
  createConNombreYApellidoObligatorioYDni(@Body() user) {
    if (!user?.name?.trim() || !user?.lastName?.trim() || !user?.dni?.trim())
      throw new BadRequestException('Faltan parámetros');
    return this.userClient.send({ user: 'create' }, user);
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string) {}

  /**
   * Para borrar mandar el id del registro
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Owner() owner) {
    return this.userClient.send({ user: 'remove' }, { id, owner });
  }
}
