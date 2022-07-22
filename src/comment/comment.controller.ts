import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { TrackCommentService } from './trackComment.service';
import { CreateTrackCommentDto } from './dto/createTrackCommentDto';
import { TrackCommentDocument } from './schemas/trackComment.schema';
import { AlbumCommentDocument } from './schemas/albumComment.schema';
import { AlbumCommentService } from './albumComment.service';
import { CreateAlbumCommentDto } from './dto/createAlbumCommentDto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('/api/comments')
export class CommentController {
  constructor(
    private readonly trackCommentService: TrackCommentService,
    private readonly albumCommentService: AlbumCommentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/track')
  createTrackComment(@Body() dto: CreateTrackCommentDto): Promise<TrackCommentDocument> {
    return this.trackCommentService.createTrackComment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/album')
  createAlbumComment(@Body() dto: CreateAlbumCommentDto): Promise<AlbumCommentDocument> {
    return this.albumCommentService.createAlbumComment(dto);
  }
}
