import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService) {}

  verify<T>(token: string): T {
    try {
      // ? verify может же вернуть ошибку ? Если токен не валидный
      const userData = this.jwtService.verify(token);
      return userData as T;
    } catch (e) {
      throw new HttpException(
        'Пользователь не авторизован (RefreshTokenService)',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateToken(payload: { [key: string]: any }): string {
    return this.jwtService.sign(payload);
  }
}
