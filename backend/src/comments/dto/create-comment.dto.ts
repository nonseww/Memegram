import { validationMessage as vm } from '#/common/utils/validation-messages.util.js';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: vm('post_id').required })
  post_id!: number;

  @IsString({ message: vm('text').string })
  @IsNotEmpty({ message: vm('text').required })
  text!: string;
}
