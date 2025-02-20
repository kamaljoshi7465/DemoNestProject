import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
    @Post()
    async createComment(@Body() createCommentDto: { postId: number, content: string }) {
      return this.commentService.createComment(createCommentDto.postId, createCommentDto.content);
    }

  @Get('post/:postId')
  findByPost(@Param('postId') postId: number) {
    return this.commentService.getCommentsByPost(+postId);
  }
}