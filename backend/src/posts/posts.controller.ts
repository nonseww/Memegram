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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CurrentUser } from '#/common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '#/common/guards/jwt-auth.guard.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePostDto, @CurrentUser() user) {
    console.log('User from token:', user);
    return this.postsService.create(dto, user?.id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.postsService.findAll(user?.id);
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
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user,
  ) {
    return this.postsService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user) {
    return this.postsService.remove(id, user?.id);
  }
}
