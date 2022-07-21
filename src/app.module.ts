import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';
import { TrackModule } from './track/track.module';
import { CommentModule } from './comment/comment.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(process.env.URL_MONGO),
    AuthModule,
    TokensModule,
    MailModule,
    FilesModule,
    TrackModule,
    CommentModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
