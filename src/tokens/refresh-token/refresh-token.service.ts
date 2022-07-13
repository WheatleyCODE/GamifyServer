import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService) {}

  // verify(token: string) {
  //   return this.jwtService.verify(token);
  // }

  generateToken(payload: { [key: string]: any }): string {
    return this.jwtService.sign(payload);
  }
}
