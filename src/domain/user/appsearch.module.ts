import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmartSearchService } from './smart.search.service';
import { AppSearchResolver } from './appsearch.resolver';
import { SmartFilterService } from './smart.filter.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppSearchResolver, SmartSearchService, SmartFilterService, PrismaService],
  exports: [SmartSearchService, SmartFilterService],
})
export class AppSearchModule {}
