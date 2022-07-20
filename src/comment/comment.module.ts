import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from 'src/track/track.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TrackComment, TrackCommentSchema } from './schemas/trackComment.schema';

@Module({
  imports: [TrackModule, MongooseModule.forFeature([{ name: TrackComment.name, schema: TrackCommentSchema }])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
