import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, tap } from 'rxjs';
import { USER_MS } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MS) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  getUserInfo(sub: number): Observable</** USER */ any> {
    return this.userClient.send({ user: 'findOne' }, sub);
  }

  login(credenciales) {
    return this.userClient.send({ auth: 'login' }, credenciales).pipe(
      catchError((err) => {
        throw new HttpException(err.message, err.statusCode);
      }),
      tap((data) => {
        //REGISTRAR EL LOG DEL LOGIN
      }),
      map((data: { id: number; username: string }) => ({
        user: data,
        access_token: this.createToken(data.id, data.username),
      })),
    );
  }

  private createToken(id: number, username: string) {
    if (!id) throw new BadRequestException('Falta ID');

    const payload = { sub: id, username, createDate: new Date() };

    return this.jwtService.sign(payload);
  }
}
