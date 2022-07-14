import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
  constructor(private jwtService: JwtService) {}

  verify<T>(token: string): T {
    try {
      // ? verify может же вернуть ошибку ? Если токен не валидный
      const userData = this.jwtService.verify(token);
      return userData as T;
    } catch (e) {
      throw new HttpException(
        'Пользователь не авторизован (AccessTokenService)',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateToken(payload: { [key: string]: any }): string {
    return this.jwtService.sign(payload);
  }
}
