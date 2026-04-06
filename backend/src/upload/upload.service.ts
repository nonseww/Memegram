import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileUrl = `${process.env.API_URL || 'http://localhost:3001'}/uploads/${file.filename}`;
    return fileUrl;
  }
}
