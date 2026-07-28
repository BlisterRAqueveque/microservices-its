import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_MS } from 'src/config';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_MS) private readonly userClient: ClientProxy) {}

  getUserInfo(sub: number): Observable</** USER */ any> {
    return this.userClient.send({ user: 'findOne' }, sub);
  }
}
