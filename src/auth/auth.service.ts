import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { UserDto } from './dto/user.dto';
import { ChangePassword, ResetPassword, UserData } from 'src/types/auth';
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
        throw new HttpException('Пользователь с такой почтой уже сущетсвует', HttpStatus.CONFLICT);
      }

      const randomString = uuid.v4();
      const link = `${process.env.URL_API}/api/auth/activate/${randomString}`;
      await this.mailService.sendActivationMail(email, link);

      const hashPassword = await bcrypt.hash(password, 6);
      const newUser = await this.usersService.create({
        ...dto,
        password: hashPassword,
        activationLink: randomString,
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
        throw new HttpException('Неверная почта или пароль', HttpStatus.BAD_REQUEST);
      }

      const isPassEqueals = await bcrypt.compare(password, user.password);

      if (!isPassEqueals) {
        throw new HttpException('Неверная почта или пароль', HttpStatus.BAD_REQUEST);
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
      await this.tokensService.saveTokens(userDto._id, tokens);

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
        throw new HttpException('Пользователь не авторизован (Refresh)', HttpStatus.UNAUTHORIZED);
      }

      const userDto = this.tokensService.validateRefreshToken(refreshToken);
      const tokensDB = await this.tokensService.findTokensBy({ refreshToken });

      if (!userDto || !tokensDB) {
        throw new HttpException('Пользователь не авторизован (!userData || !tokensDB)', HttpStatus.UNAUTHORIZED);
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

  async resetPassword(email: string): Promise<ResetPassword> {
    try {
      const user = await this.usersService.findUserBy({ email });

      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }

      const randomString = uuid.v4();
      const link = `${process.env.URL_CLIENT}/change/password/${randomString}`;
      user.resetPasswordLink = randomString;
      await user.save();
      await this.mailService.sendResetPasswordMail(email, link);

      return {
        message: 'Было отправлено письмо',
        email,
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw e;
    }
  }

  async changePassword(password: string, resetPasswordLink: string): Promise<ChangePassword> {
    try {
      const user = await this.usersService.findUserBy({ resetPasswordLink });

      if (!user) {
        throw new HttpException('Пользователь не запрашивал смену пароля', HttpStatus.NOT_FOUND);
      }

      const hashPassword = await bcrypt.hash(password, 6);
      user.password = hashPassword;
      user.resetPasswordLink = undefined;
      await user.save();

      return {
        message: 'Пароль успешно изменен',
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw e;
    }
  }

  async loginByActivationLink(activationLink: string): Promise<UserData> {
    try {
      const user = await this.usersService.findUserBy({ activationLink });

      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }

      user.activationLink = undefined;
      await user.save();

      return await this.getTokensAndUserData(user);
    } catch (e) {
      throw e;
    }
  }
}
