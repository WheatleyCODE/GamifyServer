import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UsersModule, MailModule, TokensModule],
})
export class AuthModule {}
