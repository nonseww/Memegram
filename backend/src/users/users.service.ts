import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '#/prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { excludePassword } from '#/common/utils/password.util.js';
import { USER_PUBLIC_SELECT } from '#/common/constants/prisma-select.constant.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  private async findUserById(id: number): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  private async isEmailNotTaken(email: string, excludeUserId?: number) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        ...(excludeUserId && { NOT: { id: excludeUserId } }),
      },
    });

    if (user) {
      this.logger.warn(`Email ${email} is already taken`);
      throw new ConflictException('User with this email already exists');
    }
  }

  private async isUsernameNotTaken(username: string, excludeUserId?: number) {
    const user = await this.prisma.users.findFirst({
      where: {
        username,
        ...(excludeUserId && { NOT: { id: excludeUserId } }),
      },
    });

    if (user) {
      this.logger.warn(`Username ${username} is already taken`);
      throw new ConflictException('User with this username already exists');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateUserDto) {
    await this.isEmailNotTaken(dto.email);
    await this.isUsernameNotTaken(dto.username);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    this.logger.log('User was created successfully');
    return excludePassword(user);
  }

  async findAll() {
    return this.prisma.users.findMany({
      select: USER_PUBLIC_SELECT,
    });
  }

  async getProfile(username: string, currentUserId: number | undefined) {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        about: true,
        avatar_url: true,
        cover_url: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            followings: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    let isFollowing = false;
    if (currentUserId) {
      const follow = await this.prisma.follows.findUnique({
        where: {
          follower_id_following_id: {
            follower_id: currentUserId,
            following_id: user.id,
          },
        },
      });
      isFollowing = !!follow;
    }

    return {
      ...user,
      postsCount: user?._count.posts,
      followersCount: user?._count.followers,
      followingsCount: user?._count.followings,
      isFollowing,
    };
  }

  async findOne(id: number) {
    const user = await this.findUserById(id);
    return excludePassword(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findById(id);

    if (dto.email) {
      await this.isEmailNotTaken(dto.email);
    }

    if (dto.username) {
      await this.isUsernameNotTaken(dto.username);
    }

    const data = { ...dto };
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    const user = await this.prisma.users.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        about: true,
        email: true,
        role: true,
        avatar_url: true,
        cover_url: true,
        created_at: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            followings: true,
          },
        },
      },
    });

    this.logger.log(`User was updated successfully`);

    return {
      ...user,
      postsCount: user._count.posts,
      followersCount: user._count.followers,
      followingsCount: user._count.followings,
    };
  }

  async remove(id: number) {
    const user = await this.findById(id);

    await this.prisma.users.delete({
      where: { id },
    });

    this.logger.log('User was deleted successfully');
  }

  async toggleFollow(followerId: number, followingId: number) {
    if (followerId === followerId) {
      throw new BadRequestException('User cannot follow themself');
    }

    const targetUser = await this.findUserById(followerId);

    const isFollowExisting = await this.prisma.follows.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: followerId,
          following_id: followingId,
        },
      },
    });

    if (isFollowExisting) {
      await this.prisma.follows.delete({
        where: {
          follower_id_following_id: {
            follower_id: followerId,
            following_id: followingId,
          },
        },
      });
      return { isFolowing: false };
    } else {
      await this.prisma.follows.create({
        data: {
          follower_id: followerId,
          following_id: followingId,
        },
      });
      return { isFollowing: true };
    }
  }
}
