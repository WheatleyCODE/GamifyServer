import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AccessTokenService } from './access-token/access-token.service';
import { AccRefTokens } from 'src/types/tokens';
import { Tokens, TokensDocument } from './schemas/tokens.schema';

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
    const tokensData = await this.tokensModel.findOne({ userId });

    if (tokensData) {
      tokensData.accessToken = tokens.accessToken;
      tokensData.refreshToken = tokens.refreshToken;
      return await tokensData.save();
    }

    return await this.tokensModel.create({ userId, ...tokens });
  }
}
