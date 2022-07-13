import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { UserDto } from './dto/user.dto';
import { UserData } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly tokensService: TokensService,
  ) {}

  async registration(dto: RegistrationDto): Promise<UserData> {
    try {
      const condidate = await this.usersService.findUserByEmail(dto.email);

      if (condidate) {
        // ! Обработать ошибку
        console.log(condidate);
        console.log('error');
        return;
      }

      const user = await this.usersService.create(dto);
      const userDto = new UserDto(user);
      const activationLink = uuid.v4();

      await this.mailService.sendActivationMail(dto.email, activationLink);

      const tokens = this.tokensService.generateTokens({ ...userDto });
      this.tokensService.saveTokens(userDto.id, tokens);

      return {
        user: userDto,
        ...tokens,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async login(): Promise<UserData> {
    try {
      return {} as UserData;
    } catch (e) {
      console.log(e);
    }
  }

  async logout(): Promise<void> {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async activate(): Promise<void> {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(): Promise<void> {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}
