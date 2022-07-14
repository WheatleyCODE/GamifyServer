import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { UserDto } from './dto/user.dto';
import { UserData } from 'src/types/auth';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { TokensDocument } from 'src/tokens/schemas/tokens.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly tokensService: TokensService,
  ) {}

  async registration(dto: RegistrationDto): Promise<UserData> {
    try {
      const { password, email } = dto;
      const user = await this.usersService.findUserBy({
        email,
      });

      if (user) {
        throw new HttpException(
          'Пользователь с таким Email уже сущетсвует',
          HttpStatus.CONFLICT,
        );
      }

      const randomString = uuid.v4();
      const link = `${process.env.URL_API}/api/auth/activate/${randomString}`;
      await this.mailService.sendActivationMail(email, link);

      const hashPassword = await bcrypt.hash(password, 6);
      const newUser = await this.usersService.create({
        ...dto,
        password: hashPassword,
      });

      return await this.getTokensAndUserData(newUser);
    } catch (e) {
      throw e;
    }
  }

  async login(dto: LoginDto): Promise<UserData> {
    try {
      const { email, password } = dto;
      const user = await this.usersService.findUserBy({ email });

      if (!user) {
        throw new HttpException(
          'Неверная почта или пароль',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPassEqueals = await bcrypt.compare(password, user.password);

      if (!isPassEqueals) {
        throw new HttpException(
          'Неверная почта или пароль',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.getTokensAndUserData(user);
    } catch (e) {
      throw e;
    }
  }

  private async getTokensAndUserData(user: UserDocument): Promise<UserData> {
    try {
      const userDto = new UserDto(user);
      const tokens = this.tokensService.generateTokens({ ...userDto });
      await this.tokensService.saveTokens(userDto.id, tokens);

      return {
        user: userDto,
        ...tokens,
      };
    } catch (e) {
      throw e;
    }
  }

  async logout(refreshToken: string): Promise<TokensDocument> {
    try {
      return await this.tokensService.removeTokens(refreshToken);
    } catch (e) {
      throw e;
    }
  }

  async activate(activationLink: string): Promise<void> {
    try {
      const user = await this.usersService.findUserBy({
        activationLink,
      });

      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }

      user.isActivated = true;
      await user.save();
    } catch (e) {
      throw e;
    }
  }

  async refresh(refreshToken: string): Promise<UserData> {
    try {
      if (!refreshToken) {
        throw new HttpException(
          'Пользователь не авторизован (Refresh)',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const userData = this.tokensService.validateRefreshToken(refreshToken);
      const tokensDB = await this.tokensService.findTokensBy({ refreshToken });

      if (!userData || !tokensDB) {
        throw new HttpException(
          'Пользователь не авторизован (!userData || !tokensDB)',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.usersService.findUserBy({ _id: tokensDB.userId });

      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }

      return await this.getTokensAndUserData(user);
    } catch (e) {
      throw e;
    }
  }
}
