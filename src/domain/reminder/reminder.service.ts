import { Injectable } from '@nestjs/common';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReminderService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReminderInput) {
    return this.prisma.reminder.create({ data });
  }

  findAll() {
    return this.prisma.reminder.findMany();
  }

  findOne(id: number) {
    return this.prisma.reminder.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateReminderInput) {
    return this.prisma.reminder.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.reminder.delete({ where: { id } });
  }
}
