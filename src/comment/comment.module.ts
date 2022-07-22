import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from 'src/track/track.module';
import { CommentController } from './comment.controller';
import { TrackCommentService } from './trackComment.service';
import { TrackComment, TrackCommentSchema } from './schemas/trackComment.schema';
import { AlbumModule } from 'src/album/album.module';
import { AlbumComment, AlbumCommentSchema } from './schemas/albumComment.schema';
import { AlbumCommentService } from './albumComment.service';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    TokensModule,
    TrackModule,
    AlbumModule,
    MongooseModule.forFeature([{ name: TrackComment.name, schema: TrackCommentSchema }]),
    MongooseModule.forFeature([{ name: AlbumComment.name, schema: AlbumCommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [TrackCommentService, AlbumCommentService],
})
export class CommentModule {}
