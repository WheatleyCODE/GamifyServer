import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    MongooseModule.forRoot('mongodb://localhost:2717/gamify'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
