import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.getPosts();
  }
}