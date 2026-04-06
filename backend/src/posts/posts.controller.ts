import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CurrentUser } from '#/common/decorators/current-user.decorator.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAll(userId);
  }

  @Get('user/:userId')
  findAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user,
  ) {
    return this.postsService.findAllByUserId(userId, user?.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.postsService.findOne(id, user?.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user,
  ) {
    return this.postsService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.postsService.remove(id, user?.id);
  }
}
