import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Blog } from './interfaces/blog.interface';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

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

  @Patch(':id')
  async updateBlog(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogService.updateBlog(+id, updateBlogDto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: number) {
    this.blogService.deleteBlog(+id);
    return { message: `Blog with ID ${id} has been deleted` };
  }
}
