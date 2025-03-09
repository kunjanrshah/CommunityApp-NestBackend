import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MastersCountService } from './masters.service';
import { MastersResolver } from './masters.resolver';

@Module({
  imports: [],
  controllers: [],

  providers: [MastersResolver, MastersCountService, PrismaService],
  exports: [MastersCountService],
})
export class MastersModule {}
