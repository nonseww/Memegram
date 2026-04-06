import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '#/prisma/prisma.service.js';
import { Post } from './entities/post.entity.js';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(private prisma: PrismaService) {}

  private isPostExist(id: number) {
    const post = this.prisma.posts.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} was not found`);
    }
    return post;
  }

  private transformPost(post: any, currentUserId?: number) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      meme: post.image_url,
      date: post.created_at.toISOString(),
      author: post.users.name,
      authorPfp: post.users.avatar_url,
      author_id: post.users.id,
      likesCount: post.likes.length,
      isLiked: currentUserId
        ? post.likes.some((like) => like.user_id === currentUserId)
        : false,
      commentsCount: post._count.comments,
      isEditable: currentUserId === post.user_id,
    };
  }

  async create(dto: CreatePostDto, userId: number) {
    const data = { ...dto, user_id: userId };
    const post = await this.prisma.posts.create({
      data,
    });
    this.logger.log('Post was created successfully');
    return post;
  }

  async findAll(currentUserId?: number) {
    const posts = await this.prisma.posts.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar_url: true,
          },
        },
        likes: {
          select: {
            user_id: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return posts.map((post) => this.transformPost(post, currentUserId));
  }

  async findAllByUserId(userId: number, currentUserId?: number) {
    const posts = await this.prisma.posts.findMany({
      where: { user_id: userId },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar_url: true,
          },
        },
        likes: {
          select: {
            user_id: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return posts.map((post) => this.transformPost(post, currentUserId));
  }

  async findOne(id: number, currentUserId?: number) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar_url: true,
          },
        },
        likes: {
          select: {
            user_id: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with ${id} was not found`);
    }
    return this.transformPost(post, currentUserId);
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.isPostExist(id);

    if (post?.user_id !== userId) {
      throw new ForbiddenException('You can only edit your own posts');
    }

    const data = { ...dto };
    const updatedPost = await this.prisma.posts.update({
      where: { id },
      data,
    });
    return updatedPost;
  }

  async remove(id: number, userId: number) {
    const post = await this.isPostExist(id);

    if (post?.user_id !== userId) {
      throw new ForbiddenException('YOu can only delete your own posts');
    }

    await this.prisma.posts.delete({ where: { id } });
  }
}
