import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '#/users/users.service.js';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '#/users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ConfigService } from '@nestjs/config';
import { excludePassword } from '#/common/utils/password.util.js';
import {
  AuthResponse,
  JwtPayload,
  Tokens,
} from './interfaces/auth.interface.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(dto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(dto);
    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      roles: user.role ? [user.role] : ['user'],
    });

    return {
      user,
      tokens,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      roles: user.role ? [user.role] : ['user'],
    });

    return {
      user: excludePassword(user),
      tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens({
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        roles: user.role ? [user.role] : ['user'],
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
