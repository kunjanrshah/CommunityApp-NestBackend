import { Injectable } from '@nestjs/common';
import { AddUserArgs } from './args/user.add.args';
import { UpdateUserArgs } from './args/user.update.args';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserArgs } from './args/user.registration.args';

@Injectable()
export class UserService {
  constructor (private readonly prisma: PrismaService) {}

  async login (mobile: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { mobile, password },
    });
    return user;
  }

  async getAllUsers () {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findUserById (id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findUserByMobile (mobile: string) {
    const user = await this.prisma.user.findFirst({ where: { mobile } });
    return user;
  }

  async deleteUser (id: number): Promise<string> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return `User with ID ${id} has been successfully deleted.`;
    } catch (error) {
      return `Failed to delete user with ID ${id}: ${error.message}`;
    }
  }

  async addUser (addUserArgs: AddUserArgs) {
    return await this.prisma.user.create({
      data: { ...addUserArgs },
    });
  }

  async registerUser (registerUserArgs: RegisterUserArgs) {
    return await this.prisma.user.create({
      data: { ...registerUserArgs },
    });
  }

  async updateUser (id: number, updateUserArgs: UpdateUserArgs) {
    return await this.prisma.user.update({
      where: { id },
      data: { ...updateUserArgs },
    });
  }
}
