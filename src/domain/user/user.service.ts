import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpsertUserInput } from './dto/user.upsert.dto';
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

        const formatISTDate = (date: Date) => {
          const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
          return new Date(date.getTime() + istOffset).toISOString();
        };

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
            last_login: formatISTDate(new Date()),
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
          last_login: formatISTDate(new Date()),
          profile_percent: data.profile_percent ?? 5,
        };

        // Upsert User
        const user = await prisma.user.upsert({
          where: { id: data.user_id ?? -1 },
          update: userUpdateData,
          create: userCreateData,
        });

        // Upsert Address
        if (data.city_id || data.states_id || data.address) {
          const addressUpdateData = Object.fromEntries(
            Object.entries({
              city_id: data.city_id,
              states_id: data.states_id,
              addr_type: data.addr_type,
              address: data.address,
              area: data.area,
              pincode: data.pincode,
              local_address: data.local_address,
              mosaad_id: data.mosaad_id,
            }).filter(([, v]) => v !== undefined),
          );

          await prisma.userAddress.upsert({
            where: { user_id: user.id },
            update: addressUpdateData,
            create: {
              city_id: data.city_id!,
              states_id: data.states_id!,
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

        // **Upsert User Work Details**
        if (data.business_category_id || data.company_name) {
          const workUpdateData = Object.fromEntries(
            Object.entries({
              business_category_id: data.business_category_id,
              business_address: data.business_address,
              business_logo: data.business_logo,
              company_name: data.company_name,
              website: data.website,
              work_details: data.work_details,
            }).filter(([, v]) => v !== undefined),
          );

          await prisma.userWorkDetail.upsert({
            where: { user_id: user.id },
            update: workUpdateData,
            create: {
              user_id: user.id,
              business_category_id: data.business_category_id ?? null,
              business_address: data.business_address ?? null,
              business_logo: data.business_logo ?? null,
              company_name: data.company_name ?? null,
              website: data.website ?? null,
              work_details: data.work_details ?? null,
            },
          });
        }

        // **Upsert User Matrimony Details**
        if (data.hobby || data.birth_time) {
          const matrimonyUpdateData = Object.fromEntries(
            Object.entries({
              birth_time: data.birth_time,
              birth_place_id: data.birth_place_id,
              hobby: data.hobby,
              about_me: data.about_me,
              weight: data.weight,
              height: data.height,
              is_spect: data.is_spect,
              is_mangal: data.is_mangal,
              is_shani: data.is_shani,
              facebook_profile: data.facebook_profile,
              expectation: data.expectation,
            }).filter(([, v]) => v !== undefined),
          );

          await prisma.userMatrimony.upsert({
            where: { user_id: user.id },
            update: matrimonyUpdateData,
            create: {
              user_id: user.id,
              birth_time: data.birth_time ?? null,
              birth_place_id: data.birth_place_id ?? null,
              hobby: data.hobby!,
              about_me: data.about_me ?? null,
              weight: data.weight ?? null,
              height: data.height ?? null,
              is_spect: data.is_spect ?? false,
              is_mangal: data.is_mangal ?? false,
              is_shani: data.is_shani ?? false,
              facebook_profile: data.facebook_profile ?? null,
              expectation: data.expectation ?? null,
            },
          });
        }

        // Upsert UserPersonalDetail
        if (data.is_donor || data.birth_date || data.blood_group) {
          const personalDetailUpdateData = Object.fromEntries(
            Object.entries({
              is_donor: data.is_donor,
              matrimony: data.matrimony,
              birth_date: data.birth_date,
              native_place_id: data.native_place_id,
              blood_group: data.blood_group,
              current_activity_id: data.current_activity_id,
              marital_status: data.marital_status,
              marriage_date: data.marriage_date,
              gotra_id: data.gotra_id,
            }).filter(([, v]) => v !== undefined),
          );

          await prisma.userPersonalDetail.upsert({
            where: { user_id: user.id },
            update: personalDetailUpdateData,
            create: {
              user_id: user.id,
              is_donor: data.is_donor ?? false,
              matrimony: data.matrimony ?? false,
              birth_date: data.birth_date ?? null,
              native_place_id: data.native_place_id ?? null,
              blood_group: data.blood_group ?? null,
              current_activity_id: data.current_activity_id ?? null,
              marital_status: data.marital_status ?? null,
              marriage_date: data.marriage_date ?? null,
              gotra_id: data.gotra_id ?? null,
            },
          });
        }

        // Fetch updated user with related data
        return prisma.user.findUnique({
          where: { id: user.id },
          include: {
            userAddress: true,
            userPersonalDetail: true,
            userWorkDetail: true,
            userMatrimony: true,
          },
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

  async getFamilyMembers(head_id: number) {
    return this.prisma.user.findMany({
      where: { head_id },
      include: {
        userAddress: true,
        userMatrimony: true,
        userPersonalDetail: true,
        userWorkDetail: true,
      },
    });
  }

  async getUsersByDateRange(fromDate: string, toDate: string, page: number, limit: number) {
    const skip = (page - 1) * limit; // Pagination logic

    return await this.prisma.user.findMany({
      where: {
        OR: [
          {
            userPersonalDetail: {
              birth_date: {
                gte: new Date(fromDate + 'T00:00:00.000+05:30'), // Convert to IST timezone
                lte: new Date(toDate + 'T23:59:59.999+05:30'),
              },
            },
          },
          {
            userPersonalDetail: {
              marriage_date: {
                gte: new Date(fromDate + 'T00:00:00.000+05:30'),
                lte: new Date(toDate + 'T23:59:59.999+05:30'),
              },
            },
          },
        ],
      },
      include: {
        userAddress: true,
        userPersonalDetail: true,
        userWorkDetail: true,
        userMatrimony: true,
      },
      take: limit, // Limit results
      skip: skip, // Skip based on page number
      orderBy: {
        userPersonalDetail: {
          birth_date: 'asc', // Order by birth_date
        },
      },
    });
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
