import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('search')
  async search(@Query('term') term: string): Promise<PostEntity[]> {
    if (!term || term.trim() === '') {
      return [];
    }
    return this.postsService.searchPosts(term);
  }

  @Post()
  async create(@Body() post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.create(post);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: Partial<PostEntity>,
  ): Promise<PostEntity> {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.postsService.delete(id);
  }
}
