import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpsertUserInput } from './args/user.upsert.args';
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

  async upsertUser(data: UpsertUserInput) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

        // Function to format date as 'Y-m-d H:i:s'
        const formatDate = (date: Date) => date.toISOString().slice(0, 19).replace('T', ' '); // Converts to 'YYYY-MM-DD HH:MM:SS'

        // Remove undefined values dynamically
        const userUpdateData = Object.fromEntries(
          Object.entries({
            role: data.role,
            email: data.email,
            mobile: data.mobile,
            password: hashedPassword,
            head_id: data.head_id,
            member_code: data.member_code,
            relation_id: data.relation_id,
            sub_community_id: data.sub_community_id,
            local_community_id: data.local_community_id,
            first_name: data.first_name,
            last_name_id: data.last_name_id,
            father_name: data.father_name,
            mother_name: data.mother_name,
            status: data.status,
            gender: data.gender,
            phone: data.phone,
            profile_pic: data.profile_pic,
            region: data.region,
            is_expired: data.is_expired,
            expire_date: data.expire_date,
            education_id: data.education_id,
            occupation_id: data.occupation_id,
            deleted: data.deleted,
            login_status: data.login_status,
            last_login: formatDate(new Date()),
            profile_percent: data.profile_percent,
          }).filter(([, v]) => v !== undefined),
        );

        const userCreateData = {
          role: data.role ?? 'USER',
          email: data.email ?? null,
          mobile: data.mobile ?? null,
          password: hashedPassword ?? 'defaultPassword',
          head_id: data.head_id ?? 0,
          member_code: data.member_code ?? null,
          relation_id: data.relation_id ?? null,
          sub_community_id: data.sub_community_id ?? 0,
          local_community_id: data.local_community_id ?? 0,
          first_name: data.first_name ?? 'Unknown',
          last_name_id: data.last_name_id ?? 0,
          father_name: data.father_name ?? null,
          mother_name: data.mother_name ?? null,
          status: data.status ?? true,
          gender: data.gender ?? false,
          phone: data.phone ?? null,
          profile_pic: data.profile_pic ?? 'noimage.png',
          region: data.region ?? null,
          is_expired: data.is_expired ?? false,
          expire_date: data.expire_date ?? null,
          education_id: data.education_id ?? null,
          occupation_id: data.occupation_id ?? null,
          deleted: data.deleted ?? false,
          login_status: data.login_status ?? null,
          last_login: formatDate(new Date()),
          profile_percent: data.profile_percent ?? 5,
        };

        // Upsert User
        const user = await prisma.user.upsert({
          where: { id: data.user_id ?? -1 }, // Ensures update happens only if user exists
          update: userUpdateData,
          create: userCreateData,
        });

        // Upsert Address only if address fields are provided
        if (data.city_id || data.state_id || data.address) {
          const addressUpdateData = Object.fromEntries(
            Object.entries({
              city_id: data.city_id,
              state_id: data.state_id,
              addr_type: data.addr_type,
              address: data.address,
              area: data.area,
              pincode: data.pincode,
              local_address: data.local_address,
              mosaad_id: data.mosaad_id,
            }).filter(([, v]) => v !== undefined),
          );

          await prisma.userAddress.upsert({
            where: { user_id: user.id }, // Ensure unique user_id constraint
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
              user_id: user.id, // Ensures correct relation
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

  async updateLastLogin(user_id: number): Promise<boolean> {
    try {
      // Get the current UTC time
      const now = new Date();

      // Convert UTC to IST (UTC+5:30)
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
      const istDate = new Date(now.getTime() + istOffset);

      // Update last_login field for the user
      const updatedUser = await this.prisma.user.update({
        where: { id: user_id },
        data: { last_login: istDate },
      });

      return !!updatedUser;
    } catch (error) {
      throw new BadRequestException('Error updating last login: ' + error.message);
    }
  }

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
