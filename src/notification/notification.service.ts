import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async sendUserNotification(userId: number, title: string, message: string): Promise<void> {
    const device = await this.prisma.tkn_devices.findFirst({
      where: { user_id: userId },
      select: { tokens: true },
    });

    if (device && device.tokens) {
      await this.firebaseService.sendNotification(device.tokens, title, message);
    }
  }
}
