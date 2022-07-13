import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CharacterModule } from './character/character.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
@Module({
  imports: [
    AlbumModule,
    TrackModule,
    CharacterModule,
    CommentModule,
    PostModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(process.env.URL_MONGO),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
