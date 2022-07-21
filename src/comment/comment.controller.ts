import { Body, Controller, Post } from '@nestjs/common';
import { TrackCommentService } from './trackComment.service';
import { CreateTrackCommentDto } from './dto/createTrackCommentDto';
import { TrackCommentDocument } from './schemas/trackComment.schema';
import { AlbumCommentDocument } from './schemas/albumComment.schema';
import { AlbumCommentService } from './albumComment.service';
import { CreateAlbumCommentDto } from './dto/createAlbumCommentDto';

@Controller('/api/comments')
export class CommentController {
  constructor(
    private readonly trackCommentService: TrackCommentService,
    private readonly albumCommentService: AlbumCommentService,
  ) {}

  // Todo валидация
  @Post('/track')
  createTrackComment(@Body() dto: CreateTrackCommentDto): Promise<TrackCommentDocument> {
    return this.trackCommentService.createTrackComment(dto);
  }

  // Todo валидация
  @Post('/album')
  createAlbumComment(@Body() dto: CreateAlbumCommentDto): Promise<AlbumCommentDocument> {
    return this.albumCommentService.createAlbumComment(dto);
  }
}
