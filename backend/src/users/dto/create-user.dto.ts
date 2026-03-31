import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым ' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен иметь минимум 6 символов' })
  password: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
