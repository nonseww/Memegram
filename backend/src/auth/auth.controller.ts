import { Controller, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '#/users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }
    return this.authService.login(user);
  }
}
