import { Injectable } from '@nestjs/common';
import { StatusChangeInputDto } from './dto/status-change-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

interface UpdateUserData {
  password?: string;
  relation_id?: number;
  head_id?: number;
}

@Injectable()
export class StatusChangeService {
  constructor(private prisma: PrismaService) {}

  async statusChange(data: StatusChangeInputDto) {
    const { idList, status, extra_info, password, relation_id, head_id } = data;

    // Split the idList and convert to number array
    const idArray = idList.split(',').map((id) => Number(id));

    // Update status for users
    await this.prisma.user.updateMany({
      where: {
        id: { in: idArray },
      },
      data: {
        status: Boolean(status),
      },
    });

    // Handle extra info logic
    if (extra_info === 1) {
      // Update profile password and other details
      const updateData = {};
      if (password) {
        updateData['password'] = await this.hashPassword(password);
      }
      if (relation_id) updateData['relation_id'] = relation_id;
      if (head_id) updateData['head_id'] = head_id;

      await this.changeUsersToFamilyMembers(idArray, updateData);
    }

    // Send notification (if applicable)
    await this.sendNotification(idArray);

    return { success: true, message: 'Status changed successfully' };
  }

  private async changeUsersToFamilyMembers(idList: number[], updateData: UpdateUserData) {
    const users = await this.prisma.user.findMany({
      where: { id: { in: idList } },
    });

    // Change requested family/members to login user's members
    for (const user of users) {
      if (user.head_id === 0) {
        await this.prisma.user.updateMany({
          where: { head_id: user.id },
          data: updateData,
        });
      }

      // Change family head to login user's member
      await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }
  }

  private async sendNotification(idList: number[]) {
    const deviceTokens = await this.prisma.tkn_devices.findMany({
      where: { user_id: { in: idList } },
      select: { tokens: true },
    });

    const tokens = deviceTokens.map((device) => device.tokens);

    if (tokens.length > 0) {
      // const message = 'Login request Approved';
      // Send push notification logic here
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
