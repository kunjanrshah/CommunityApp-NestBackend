import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddUserArgs } from './args/user.add.args';
import { UpdateUserArgs } from './args/user.update.args';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserArgs } from './args/user.registration.args';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(mobile: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { mobile, password },
    });
    return user;
  }

  async registerUser(input: RegisterUserArgs) {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            first_name: input.first_name,
            last_name_id: input.last_name_id,
            email_address: input.email_address,
            mobile: input.mobile,
            password: hashedPassword, // Store hashed password
            sub_community_id: input.sub_community_id,
            local_community_id: input.local_community_id,
            gender: input.gender,
            profile_pic: input.profile_pic,
          },
        });

        const userAddressData = {
          user_id: user.id,
          address: input.address,
          city_id: input.city_id,
          state_id: input.state_id,
        };

        await tx.userAddress.create({
          data: userAddressData,
        });

        return user;
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
