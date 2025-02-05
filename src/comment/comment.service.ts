import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }

  async createComment(postId: number, content: string) {
    try {
      return await this.prisma.comment.create({
        data: {
          content,
          post: { connect: { id: postId } },
        }
      });
    } catch (err) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async getCommentsByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
    });
  }
}