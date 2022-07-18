import { ChangePassword, ResetPassword, UserData } from './../types/auth';
import { ValidationPipe } from './../pipes/validation.pipe';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TokensDocument } from 'src/tokens/schemas/tokens.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
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

  @UsePipes(ValidationPipe)
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
  async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<TokensDocument>> {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  }

  @Get('/activate/:link')
  async activate(@Req() req: Request, @Res() res: Response): Promise<void> {
    const activationLink = req.params.link;
    await this.authService.activate(activationLink);
    return res.redirect(`${process.env.URL_CLIENT}/activate/${activationLink}`);
  }

  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<UserData>> {
    const { refreshToken } = req.cookies;

    const userData = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  }

  @Post('/reset/password')
  @UsePipes(ValidationPipe)
  resetPassword(@Body() { email }: ResetPasswordDto): Promise<ResetPassword> {
    return this.authService.resetPassword(email);
  }

  @Post('/change/password')
  @UsePipes(ValidationPipe)
  changePassword(@Body() { password, resetPasswordLink }: ChangePasswordDto): Promise<ChangePassword> {
    return this.authService.changePassword(password, resetPasswordLink);
  }
}
