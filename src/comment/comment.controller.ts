import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Get()
  getAllComments() {
    return this.commentService.getAll();
  }

  @Get('/:id')
  getOneComment() {
    return this.commentService.getOne();
  }
}
