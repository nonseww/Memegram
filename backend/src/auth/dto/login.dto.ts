import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { validationMessage as vm } from '#/common/utils/validation-messages.util.js';

export class LoginDto {
  @IsEmail({}, { message: vm('Email').email })
  @IsNotEmpty({ message: vm('Email').required })
  email: string;

  @IsString({ message: vm('Password').string })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: vm('Password').alphanumericUnderscore,
  })
  @IsNotEmpty({ message: vm('Password').required })
  @MinLength(6, { message: vm('Password').maxLength(6) })
  password: string;
}
