import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadModel } from './model/uploads.model';
import { FileUpload } from './types/file-upload.interface';

@Injectable()
export class UploadsService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: FileUpload, user_id: number): Promise<UploadModel> {
    const { createReadStream, filename } = file;
    const stream = createReadStream();
    const filePath = `uploads/${Date.now()}-${filename}`;
    const fullPath = join(process.cwd(), 'public', filePath);

    const uploadDir = dirname(fullPath);
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(fullPath);
      stream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const upload = await this.prisma.uploads.create({
      data: {
        user_id,
        file_name: filename,
        file_path: filePath,
      },
    });

    return upload;
  }

  async getFilesByUser(user_id: number) {
    return this.prisma.uploads.findMany({ where: { user_id } });
  }

  async deleteFile(id: number, user_id: number) {
    const file = await this.prisma.uploads.findFirst({
      where: { id, user_id },
    });

    if (!file) throw new Error('File not found or unauthorized');

    // Optional: Remove physical file too
    try {
      const fs = await import('fs/promises');
      await fs.unlink(file.file_path);
    } catch (e) {
      console.warn('Could not delete file from disk', e);
    }

    return this.prisma.uploads.delete({ where: { id } });
  }
}
