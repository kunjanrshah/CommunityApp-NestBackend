import { Module } from '@nestjs/common';
import { UploadsResolver } from './uploads.resolver';
import { UploadsService } from './uploads.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UploadsResolver, UploadsService, PrismaService],
})
export class UploadsModule {}
