import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '#/common/decorators/current-user.decorator.js';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const url = await this.uploadService.uploadFile(file);
    return { url };
  }
}
