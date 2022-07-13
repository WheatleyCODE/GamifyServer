import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserData } from 'src/types/auth';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

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
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
  ): Promise<Response<UserData>> {
    const userData = await this.authService.login(dto);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  }

  @Post('/logout')
  logout(): Promise<void> {
    return this.authService.logout();
  }

  @Get('/activate/:link')
  async activate(@Req() req: Request, @Res() res: Response) {
    const activationLink = req.params.link;
    await this.authService.activate(activationLink);
    return res.redirect(`${process.env.URL_CLIENT}/activate/${activationLink}`);
  }

  @Get('/refresh')
  refresh(): Promise<void> {
    return this.authService.refresh();
  }
}
