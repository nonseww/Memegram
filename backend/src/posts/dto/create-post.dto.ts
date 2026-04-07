import { isString, IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { validationMessage as vm } from '#/common/utils/validation-messages.util.js';

export class CreatePostDto {
  @IsString({ message: vm('title').string })
  @IsNotEmpty({ message: vm('title').required })
  title: string;

  @IsString({ message: vm('description').string })
  @MaxLength(3000, { message: vm('description').maxLength(3000) })
  description: string;

  @IsString({ message: vm('image_url').string })
  @IsNotEmpty({ message: vm('image_url').required })
  image_url: string;
}
