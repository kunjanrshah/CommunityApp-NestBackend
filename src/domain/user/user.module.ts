import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusChangeService } from './status-change.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolver, UserService, PrismaService, StatusChangeService],
  exports: [],
})
export class UserModule {}
