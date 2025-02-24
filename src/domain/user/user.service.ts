import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddUserArgs } from './args/user.add.args';
import { UpdateUserArgs } from './args/user.update.args';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findUserByMobile(mobile: string) {
    const user = await this.prisma.user.findFirst({ where: { mobile } });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async addUser(addUserArgs: AddUserArgs) {
    return await this.prisma.user.create({
      data: { ...addUserArgs },
    });
  }

  async updateUser(id: number, updateUserArgs: UpdateUserArgs) {
    return await this.prisma.user.update({
      where: { id },
      data: { ...updateUserArgs },
    });
  }

  async deleteUser(id: number): Promise<string> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return `User with ID ${id} has been successfully deleted.`;
    } catch (error) {
      return `Failed to delete user with ID ${id}: ${error.message}`;
    }
  }
}
