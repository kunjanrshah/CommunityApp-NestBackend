import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpsertUserInput } from './args/user.upsert.args';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
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

  async upsertUser(data: UpsertUserInput) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Hash password only if provided
        const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

        // Remove undefined values dynamically from update data
        const userUpdateData: Partial<Prisma.UserUncheckedUpdateInput> = Object.fromEntries(
          Object.entries({
            role: data.role,
            email: data.email,
            mobile: data.mobile,
            password: hashedPassword,
            head_id: data.head_id,
            first_name: data.first_name,
            last_name_id: data.last_name_id,
            father_name: data.father_name,
            mother_name: data.mother_name,
            status: data.status,
            gender: data.gender,
            phone: data.phone,
            education_id: data.education_id,
            occupation_id: data.occupation_id,
          }).filter(([, v]) => v !== undefined), // Remove undefined values
        );

        // Default values for required fields in create
        const userCreateData: Prisma.UserUncheckedCreateInput = {
          role: data.role ?? 'USER',
          email: data.email ?? null,
          mobile: data.mobile ?? null,
          password: hashedPassword ?? 'defaultPassword',
          head_id: data.head_id ?? 0,
          first_name: data.first_name ?? 'Unknown',
          last_name_id: data.last_name_id ?? 0,
          father_name: data.father_name ?? null,
          mother_name: data.mother_name ?? null,
          status: data.status ?? true,
          gender: data.gender ?? false,
          phone: data.phone ?? null,
          local_community_id: data.local_community_id ?? 0,
          sub_community_id: data.sub_community_id ?? null,
          education_id: data.education_id ?? null,
          occupation_id: data.occupation_id ?? null,
        };

        // Upsert User
        const user = await prisma.user.upsert({
          where: { id: data.user_id ?? -1 },
          update: userUpdateData,
          create: userCreateData,
        });

        // Upsert Address only if any address fields are provided
        if (data.city_id || data.state_id || data.address) {
          const addressUpdateData: Partial<Prisma.UserAddressUncheckedUpdateInput> =
            Object.fromEntries(
              Object.entries({
                city_id: data.city_id,
                state_id: data.state_id,
                addr_type: data.addr_type,
                address: data.address,
                area: data.area,
                pincode: data.pincode,
                local_address: data.local_address,
                mosaad_id: data.mosaad_id,
              }).filter(([, v]) => v !== undefined), // Remove undefined values
            );

          await prisma.userAddress.upsert({
            where: { id: data.address_id ?? -1 },
            update: addressUpdateData,
            create: {
              city_id: data.city_id!,
              state_id: data.state_id!,
              addr_type: data.addr_type ?? 'OWN',
              address: data.address!,
              area: data.area ?? null,
              pincode: data.pincode ?? null,
              local_address: data.local_address ?? null,
              mosaad_id: data.mosaad_id ?? null,
              user_id: user.id,
            },
          });
        }

        // Fetch updated user with address
        return prisma.user.findUnique({
          where: { id: user.id },
          include: { address: true },
        });
      });
    } catch (error) {
      throw new BadRequestException('Error upserting user: ' + error.message);
    }
  }

  //   async updateUser(id: number, updateUserArgs: UpdateUserArgs) {
  //   return await this.prisma.user.update({
  //     where: { id },
  //     data: { ...updateUserArgs },
  //   });
  // }

  // async deleteUser(id: number): Promise<string> {
  //   try {
  //     await this.prisma.user.delete({
  //       where: { id },
  //     });
  //     return `User with ID ${id} has been successfully deleted.`;
  //   } catch (error) {
  //     return `Failed to delete user with ID ${id}: ${error.message}`;
  //   }
  // }

  // async findUserById(id: number) {
  //   const user = await this.prisma.user.findUnique({ where: { id } });
  //   return user;
  // }

  // async findUserByMobile(mobile: string) {
  //   const user = await this.prisma.user.findFirst({ where: { mobile } });
  //   return user;
  // }

  // async getAllUsers() {
  //   const users = await this.prisma.user.findMany();
  //   return users;
  // }

  // async getAllUsersByFilter() {
  //   const users = await this.prisma.user.findMany();
  //   return users;
  // }
}
