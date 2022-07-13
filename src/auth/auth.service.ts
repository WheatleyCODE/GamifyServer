import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        throw new HttpException(
          'Пользователь с таким Email уже сущетсвует',
          HttpStatus.CONFLICT,
        );
      }

      const user = await this.usersService.create(dto);
      const userDto = new UserDto(user);
      const randomString = uuid.v4();

      const link = `${process.env.API_URL}/api/activate/${randomString}`;

      await this.mailService.sendActivationMail(dto.email, link);

      const tokens = this.tokensService.generateTokens({ ...userDto });
      this.tokensService.saveTokens(userDto.id, tokens);

      return {
        user: userDto,
        ...tokens,
      };
    } catch (e) {
      throw e;
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
