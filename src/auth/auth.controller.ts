import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserData } from 'src/types/auth';
import { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(
    @Body() dto: RegistrationDto,
    @Res() res: Response,
  ): Promise<Response<UserData>> {
    const userData = await this.authService.registration(dto);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  }

  @Post('/login')
  login(): Promise<UserData> {
    return this.authService.login();
  }

  @Post('/logout')
  logout(): Promise<void> {
    return this.authService.logout();
  }

  @Get('/activate/:link')
  activate(): Promise<void> {
    return this.authService.activate();
  }

  @Get('/refresh')
  refresh(): Promise<void> {
    return this.authService.refresh();
  }
}
