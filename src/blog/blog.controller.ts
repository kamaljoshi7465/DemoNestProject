import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Blog } from './interfaces/blog.interface';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Blog> {
    const blog = await this.blogService.findById(+id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }
}
