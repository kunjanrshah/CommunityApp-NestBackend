import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReminderService } from './reminder.service';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Reminder } from './dto/model/reminder.dto';

@Resolver(() => Reminder)
export class ReminderResolver {
  constructor(private readonly reminderService: ReminderService) {}

  @Mutation(() => Reminder)
  createReminder(@Args('input') input: CreateReminderInput) {
    return this.reminderService.create(input);
  }

  @Query(() => [Reminder], { name: 'reminders' })
  findAll() {
    return this.reminderService.findAll();
  }

  @Query(() => Reminder, { name: 'reminder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reminderService.findOne(id);
  }

  @Mutation(() => Reminder)
  updateReminder(@Args('input') input: UpdateReminderInput) {
    return this.reminderService.update(input.id, input);
  }

  @Mutation(() => Reminder)
  removeReminder(@Args('id', { type: () => Int }) id: number) {
    return this.reminderService.remove(id);
  }
}
