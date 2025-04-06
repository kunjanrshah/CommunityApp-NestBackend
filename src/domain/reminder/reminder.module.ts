import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderResolver } from './reminder.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ReminderResolver, ReminderService, PrismaService],
})
export class ReminderModule {}
