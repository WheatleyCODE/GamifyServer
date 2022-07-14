import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AccessTokenService } from './access-token/access-token.service';
import { AccRefTokens } from 'src/types/tokens';
import { Tokens, TokensDocument } from './schemas/tokens.schema';
import { UserData } from 'src/types/auth';

@Injectable()
export class TokensService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    @InjectModel(Tokens.name) private tokensModel: Model<TokensDocument>,
  ) {}

  generateTokens(data: { [key: string]: any }): AccRefTokens {
    const accessToken = this.accessTokenService.generateToken(data);
    const refreshToken = this.refreshTokenService.generateToken(data);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(userId: string, tokens: AccRefTokens): Promise<Tokens> {
    try {
      const tokensData = await this.tokensModel.findOne({ userId });

      if (tokensData) {
        tokensData.accessToken = tokens.accessToken;
        tokensData.refreshToken = tokens.refreshToken;
        return await tokensData.save();
      }

      return await this.tokensModel.create({ userId, ...tokens });
    } catch (e) {
      throw new HttpException(
        'Ошибка при сохранении токенов',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeTokens(refreshToken: string): Promise<TokensDocument> {
    try {
      return await this.tokensModel.findOneAndRemove({ refreshToken });
    } catch (e) {
      throw new HttpException(
        'Ошибка при удалении токенов',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findTokensBy(options: { [key: string]: any }): Promise<TokensDocument> {
    try {
      return await this.tokensModel.findOne({ ...options });
    } catch (e) {
      throw new HttpException(
        'Ошибка при поиске токенов',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  validateAccessToken(token: string): UserData {
    try {
      return this.accessTokenService.verify<UserData>(token);
    } catch (e) {
      throw e;
    }
  }

  validateRefreshToken(token: string): UserData {
    try {
      return this.refreshTokenService.verify<UserData>(token);
    } catch (e) {
      throw e;
    }
  }
}
