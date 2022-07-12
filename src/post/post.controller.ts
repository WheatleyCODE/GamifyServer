import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAll();
  }

  @Get('/:id')
  getOnePost() {
    return this.postService.getOne();
  }
}
