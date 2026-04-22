import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { PrismaService } from '#/prisma/prisma.service.js';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto, currentUserId: number) {
    const data = { ...dto, user_id: currentUserId };
    const comment = await this.prisma.comments.create({
      data,
    });
    return comment;
  }

  async findByPostId(id: number) {
    const comments = await this.prisma.comments.findMany({
      where: { post_id: id },
    });
    return comments;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
