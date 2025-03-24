import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SmartSearchService {
  constructor(private prisma: PrismaService) {}

  async smartSearch(start: number, length: number, filterBy?: string) {
    if (!filterBy) return { totalRecords: 0, members: [] };

    const whereCondition: Prisma.UserWhereInput = {
      OR: [
        { first_name: { contains: filterBy, mode: 'insensitive' } },
        { member_code: { contains: filterBy, mode: 'insensitive' } },
        { email: { contains: filterBy, mode: 'insensitive' } },
        { mobile: { contains: filterBy, mode: 'insensitive' } },
        { phone: { contains: filterBy, mode: 'insensitive' } },
        { region: { contains: filterBy, mode: 'insensitive' } },
        { father_name: { contains: filterBy, mode: 'insensitive' } },
        { mother_name: { contains: filterBy, mode: 'insensitive' } },

        // Search in related UserAddress model
        { userAddress: { area: { contains: filterBy, mode: 'insensitive' } } },
        { userAddress: { address: { contains: filterBy, mode: 'insensitive' } } },
        { userAddress: { local_address: { contains: filterBy, mode: 'insensitive' } } },

        { userAddress: { states: { name: { contains: filterBy, mode: 'insensitive' } } } },
        { userAddress: { city: { name: { contains: filterBy, mode: 'insensitive' } } } },

        // Search in related UserPersonalDetail model
        { userPersonalDetail: { blood_group: { contains: filterBy, mode: 'insensitive' } } },
        {
          userPersonalDetail: {
            native_place: { name: { contains: filterBy, mode: 'insensitive' } },
          },
        },
        { userPersonalDetail: { gotra: { name: { contains: filterBy, mode: 'insensitive' } } } },

        // Search in related UserWorkDetail model
        { userWorkDetail: { company_name: { contains: filterBy, mode: 'insensitive' } } },
        { userWorkDetail: { work_details: { contains: filterBy, mode: 'insensitive' } } },
        {
          userWorkDetail: {
            businessCategory: { name: { contains: filterBy, mode: 'insensitive' } },
          },
        },
        { userWorkDetail: { committee: { name: { contains: filterBy, mode: 'insensitive' } } } },
        { userWorkDetail: { designation: { name: { contains: filterBy, mode: 'insensitive' } } } },

        // Search in related UserMatrimony model
        { userMatrimony: { hobby: { contains: filterBy, mode: 'insensitive' } } },
        { userMatrimony: { about_me: { contains: filterBy, mode: 'insensitive' } } },

        { occupation: { name: { contains: filterBy, mode: 'insensitive' } } },

        { education: { name: { contains: filterBy, mode: 'insensitive' } } },

        { subCommunity: { name: { contains: filterBy, mode: 'insensitive' } } },

        { localCommunity: { name: { contains: filterBy, mode: 'insensitive' } } },

        { relation: { name: { contains: filterBy, mode: 'insensitive' } } },

        { subCast: { name: { contains: filterBy, mode: 'insensitive' } } },
      ],
    };

    const users = await this.prisma.user.findMany({
      where: whereCondition,
      skip: start,
      take: length,
      orderBy: { first_name: 'asc' },
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

    const totalCount = await this.prisma.user.count({ where: whereCondition });

    // Extract matched fields
    const formattedUsers = users.map((user) => {
      const matchedFields = [];

      if (user.first_name?.includes(filterBy)) matchedFields.push('FirstName');
      if (user.subCast?.name?.includes(filterBy)) matchedFields.push('LastName');
      if (user.member_code?.includes(filterBy)) matchedFields.push('MemberCode');
      if (user.email?.includes(filterBy)) matchedFields.push('Email');
      if (user.mobile?.includes(filterBy)) matchedFields.push('Mobile');
      if (user.phone?.includes(filterBy)) matchedFields.push('Phone');
      if (user.father_name?.includes(filterBy)) matchedFields.push('FatherName');
      if (user.mother_name?.includes(filterBy)) matchedFields.push('MotherName');
      if (user.region?.includes(filterBy)) matchedFields.push('Region');

      if (user.userAddress?.area?.includes(filterBy)) matchedFields.push('Area');
      if (user.userAddress?.address?.includes(filterBy)) matchedFields.push('Address');
      if (user.userAddress?.local_address?.includes(filterBy)) matchedFields.push('LocalAddress');
      if (user.userAddress?.city?.name?.includes(filterBy)) matchedFields.push('City');
      if (user.userAddress?.states?.name?.includes(filterBy)) matchedFields.push('State');

      if (user.userPersonalDetail?.blood_group?.includes(filterBy)) {
        matchedFields.push('BloodGroup');
      }
      if (user.userPersonalDetail?.native_place?.name?.includes(filterBy)) {
        matchedFields.push('Native');
      }
      if (user.userPersonalDetail?.gotra?.name?.includes(filterBy)) matchedFields.push('Gotra');

      if (user.userWorkDetail?.company_name?.includes(filterBy)) matchedFields.push('CompanyName');
      if (user.userWorkDetail?.work_details?.includes(filterBy)) matchedFields.push('WorkDetails');
      if (user.userWorkDetail?.businessCategory?.name.includes(filterBy)) {
        matchedFields.push('Business');
      }
      if (user.userWorkDetail?.committee?.name?.includes(filterBy)) matchedFields.push('Committee');
      if (user.userWorkDetail?.designation?.name?.includes(filterBy)) {
        matchedFields.push('Designation');
      }

      if (user.userMatrimony?.hobby?.includes(filterBy)) matchedFields.push('Hobby');
      if (user.userMatrimony?.about_me?.includes(filterBy)) matchedFields.push('AboutMe');

      if (user.occupation?.name?.includes(filterBy)) matchedFields.push('Occupation');
      if (user.education?.name?.includes(filterBy)) matchedFields.push('Education');
      if (user.relation?.name?.includes(filterBy)) matchedFields.push('Relation');
      if (user.localCommunity?.name?.includes(filterBy)) matchedFields.push('LocalCommunity');
      if (user.subCommunity?.name?.includes(filterBy)) matchedFields.push('SubCommunity');

      return { ...user, matchedFields };
    });

    return { totalRecords: totalCount, members: formattedUsers };
  }
}
