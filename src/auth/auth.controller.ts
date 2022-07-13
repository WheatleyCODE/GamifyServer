import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserData } from 'src/types/auth';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registration(@Body() dto: RegistrationDto): Promise<UserData> {
    return this.authService.registration(dto);
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
