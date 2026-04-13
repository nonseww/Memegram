import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { validationMessage as vm } from '#/common/utils/validation-messages.util.js';

export class CreateUserDto {
  @IsString({ message: vm('Username').string })
  @IsNotEmpty({ message: vm('Username').required })
  @MinLength(4, { message: vm('Username').minLength(4) })
  @MaxLength(30, { message: vm('Username').maxLength(30) })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: vm('Password').alphanumericUnderscore,
  })
  username!: string;

  @IsString({ message: vm('Name').string })
  @IsNotEmpty({ message: vm('Name').required })
  @MaxLength(30, { message: vm('Name').maxLength(30) })
  name!: string;

  @IsEmail({}, { message: vm('Email').email })
  @IsNotEmpty({ message: vm('Email').required })
  email!: string;

  @IsString({ message: vm('Password').string })
  @IsNotEmpty({ message: vm('Password').required })
  @MinLength(6, { message: vm('Password').minLength(6) })
  @MaxLength(100, { message: vm('Password').maxLength(100) })
  password!: string;

  @IsOptional()
  @IsString({ message: vm('About').string })
  @MaxLength(300, { message: vm('About').maxLength(300) })
  about?: string;

  @IsOptional()
  @IsString({ message: vm('Avatar_url').string })
  avatar_url?: string;

  @IsOptional()
  @IsString({ message: vm('Cover_url').string })
  cover_url?: string;
}
