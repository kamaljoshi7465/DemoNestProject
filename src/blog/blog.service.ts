import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Blog } from './interfaces/blog.interface';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      return await this.prisma.blog.create({
        data: { ...createBlogDto },
      });
    } catch (err) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findById(id: number): Promise<Blog | undefined> {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    try {
      return await this.prisma.blog.update({
        where: { id },
        data: { ...updateBlogDto },
      });
    } catch (err) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async deleteBlog(id: number) {
    try {
      await this.prisma.blog.delete({
        where: { id },
      });
    } catch (err) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
