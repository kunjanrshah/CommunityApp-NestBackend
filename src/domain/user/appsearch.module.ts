import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSearchService } from './appsearch.service';
import { AppSearchResolver } from './appsearch.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AppSearchResolver, AppSearchService, PrismaService],
  exports: [AppSearchService],
})
export class AppSearchModule {}
