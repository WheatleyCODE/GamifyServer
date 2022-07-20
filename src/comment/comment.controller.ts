import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateTrackCommentDto } from './dto/createCommentDto';
import { TrackCommentDocument } from './schemas/trackComment.schema';

@Controller('/api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Todo валидация
  @Post('/track')
  createTrackComment(@Body() dto: CreateTrackCommentDto): Promise<TrackCommentDocument> {
    return this.commentService.createTrackComment(dto);
  }
}
