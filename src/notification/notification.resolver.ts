import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => String)
  async sendNotification(
    @Args('userId') userId: number,
    @Args('title') title: string,
    @Args('message') message: string,
  ): Promise<string> {
    await this.notificationService.sendUserNotification(userId, title, message);
    return 'Notification sent successfully';
  }
}
