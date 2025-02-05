import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: { ...createPostDto },
    });
  }

  async getPosts() {
    return this.prisma.post.findMany({
      include: { comments: true },
    });
  }
}