import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchRequestDTO } from './dto/smart.filter.dto';
import { AddrType, Prisma } from '@prisma/client';

@Injectable()
export class SmartFilterService {
  constructor(private prisma: PrismaService) {}

  async get_search_datatables(searchRequest: SearchRequestDTO) {
    const { start, length, filter_by } = searchRequest;

    const where: Prisma.UserWhereInput = {};

    if (filter_by) {
      // User Table Filters
      if (filter_by.head_name) {
        where.first_name = { contains: filter_by.head_name, mode: 'insensitive' };
        where.head_id = 0;
      }

      if (filter_by.member_code) {
        where.member_code = { contains: filter_by.member_code, mode: 'insensitive' };
      }
      if (filter_by.first_name) {
        where.first_name = { contains: filter_by.first_name, mode: 'insensitive' };
      }
      if (filter_by.father_name) {
        where.father_name = { contains: filter_by.father_name, mode: 'insensitive' };
      }
      if (filter_by.mother_name) {
        where.mother_name = { contains: filter_by.mother_name, mode: 'insensitive' };
      }

      if (filter_by.email_address) {
        where.email = { contains: filter_by.email_address, mode: 'insensitive' };
      }
      if (filter_by.mobile) where.mobile = { contains: filter_by.mobile, mode: 'insensitive' };

      if (filter_by.gender !== undefined) where.gender = filter_by.gender;
      if (filter_by.is_expired !== undefined) where.is_expired = filter_by.is_expired;

      if (filter_by.expire_date) {
        const dateOnly = filter_by.expire_date.split('T')[0]; // Extract YYYY-MM-DD
        where.expire_date = {
          equals: new Date(dateOnly), // Ensure Prisma compares only the date
        };
      }

      if (filter_by.updated_dt) {
        const dateOnly = filter_by.updated_dt.split('T')[0]; // Extract YYYY-MM-DD
        where.updated = {
          equals: new Date(dateOnly), // Ensure Prisma compares only the date
        };
      }

      // User Personal Details
      where.userPersonalDetail = {
        is: {
          ...(filter_by.marital_status && { marital_status: filter_by.marital_status }),
          ...(filter_by.birth_date && {
            birth_date: {
              equals: new Date(filter_by.birth_date.split('T')[0]),
            },
          }),
          ...(filter_by.marriage_date && {
            marriage_date: {
              equals: new Date(filter_by.marriage_date.split('T')[0]),
            },
          }),
          ...(filter_by.is_donor !== undefined && { is_donor: filter_by.is_donor }),
          ...(filter_by.gotra_id && { gotra_id: filter_by.gotra_id }),
          ...(filter_by.native_place_id && { native_place_id: filter_by.native_place_id }),
        },
      };

      // Age Filtering
      if (filter_by.min_age || filter_by.max_age) {
        const currentYear = new Date().getFullYear();
        where.userPersonalDetail = {
          is: {
            birth_date: {
              ...(filter_by.min_age && { lte: new Date(currentYear - filter_by.min_age, 0, 1) }),
              ...(filter_by.max_age && { gte: new Date(currentYear - filter_by.max_age, 11, 31) }),
            },
          },
        };
      }

      // User Address Filters
      where.userAddress = {
        is: {
          ...(filter_by.address && {
            address: { contains: filter_by.address, mode: 'insensitive' },
          }),
          ...(filter_by.pincode && {
            pincode: { contains: filter_by.pincode, mode: 'insensitive' },
          }),
          ...(filter_by.area && { area: { contains: filter_by.area, mode: 'insensitive' } }),
          ...(filter_by.city_id && { city_id: filter_by.city_id }),
          ...(filter_by.state_id && { states_id: filter_by.state_id }),
          ...(filter_by.is_rented !== undefined && {
            addr_type: filter_by.is_rented ? AddrType.RENTED : AddrType.OWN,
          }),
        },
      };

      // Work Details Filters
      where.userWorkDetail = {
        is: {
          ...(filter_by.business_address && {
            business_address: { contains: filter_by.business_address, mode: 'insensitive' },
          }),
          ...(filter_by.business_category_id && {
            business_category_id: filter_by.business_category_id,
          }),
        },
      };

      // Matrimony Filters
      where.userMatrimony = {
        is: {
          ...(filter_by.is_mangal !== undefined && { is_mangal: filter_by.is_mangal }),
          ...(filter_by.is_shani !== undefined && { is_shani: filter_by.is_shani }),
          ...(filter_by.is_spect !== undefined && { is_spect: filter_by.is_spect }),
          ...(filter_by.birth_place_id && { birth_place_id: filter_by.birth_place_id }),
          ...(filter_by.min_height !== undefined || filter_by.max_height !== undefined
            ? {
                height: {
                  gte: filter_by.min_height ?? undefined,
                  lte: filter_by.max_height ?? undefined,
                },
              }
            : {}),
          ...(filter_by.min_weight !== undefined || filter_by.max_weight !== undefined
            ? {
                weight: {
                  gte: filter_by.min_weight ?? undefined,
                  lte: filter_by.max_weight ?? undefined,
                },
              }
            : {}),
        },
      };

      // Profile Percentage Filtering
      if (filter_by.min_percentage !== undefined || filter_by.max_percentage !== undefined) {
        where.profile_percent = {
          gte: filter_by.min_percentage ?? undefined,
          lte: filter_by.max_percentage ?? undefined,
        };
      }

      // Foreign Key Filters
      if (filter_by.last_name_id) where.last_name_id = filter_by.last_name_id;
      if (filter_by.local_community_id) where.local_community_id = filter_by.local_community_id;
      if (filter_by.sub_community_id) where.sub_community_id = filter_by.sub_community_id;
      if (filter_by.occupation_id) where.occupation_id = filter_by.occupation_id;
      if (filter_by.education_id) where.education_id = filter_by.education_id;
    }

    console.log(JSON.stringify(where));

    const users = await this.prisma.user.findMany({
      where,
      skip: start,
      take: length,
      include: {
        userAddress: { include: { states: true, city: true } },
        userPersonalDetail: {
          include: { native_place: true, gotra: true, current_activity: true },
        },
        userWorkDetail: { include: { businessCategory: true, committee: true, designation: true } },
        userMatrimony: true,
        subCast: true,
        occupation: true,
        education: true,
        relation: true,
        localCommunity: true,
        subCommunity: true,
      },
    });

    console.log('Fetched Users:', users);

    return { members: users ?? [], totalRecords: users.length ?? 0 };
  }
}
