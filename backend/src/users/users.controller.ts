import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CurrentUser } from '#/common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '#/common/guards/jwt-auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  getProfile(@Param('username') username: string, @CurrentUser() currentUser) {
    return this.usersService.getProfile(username, currentUser?.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Body() dto: UpdateUserDto, @CurrentUser() user) {
    return this.usersService.update(user.id, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/follow')
  @UseGuards(JwtAuthGuard)
  toggleFollow(
    @Param('id', ParseIntPipe) targetUserId: number,
    @CurrentUser() user,
  ) {
    return this.usersService.toggleFollow(user.id, targetUserId);
  }
}
