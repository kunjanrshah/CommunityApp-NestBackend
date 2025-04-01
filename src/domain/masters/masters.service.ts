import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CountListDTO,
  MastersCountResponseDTO,
  UserCountsDTO,
} from './dto/model/masters-count.dto';
import { GetMastersResponseDTO } from './dto/model/get-masters.dto';
import { StatisticsResponseDto } from './dto/model/statistics-response.dto';
import { StatisticsInputDto } from './dto/statistics-input.dto';

@Injectable()
export class MastersCountService {
  constructor(private prisma: PrismaService) {}

  async getMastersCounts(): Promise<MastersCountResponseDTO> {
    const [
      business_categories,
      cities,
      committees,
      current_activity,
      designations,
      districts,
      educations,
      local_community,
      occupation,
      relations,
      states,
      sub_casts,
      sub_community,
      gotra,
      matrimony_counts,
      status_counts,
    ] = await Promise.all([
      this.prisma.businessCategory.count(),
      this.prisma.city.count(),
      this.prisma.committee.count(),
      this.prisma.currentActivity.count(),
      this.prisma.designation.count(),
      this.prisma.city.count(),
      this.prisma.education.count(),
      this.prisma.localCommunity.count(),
      this.prisma.occupation.count(),
      this.prisma.relations.count(),
      this.prisma.states.count(),
      this.prisma.subCast.count(),
      this.prisma.subCommunity.count(),
      this.prisma.gotra.count(),
      this.prisma.userPersonalDetail.count({ where: { matrimony: true } }),
      this.prisma.user.count({ where: { status: true } }), // Counting users with status=true
    ]);

    const countList: CountListDTO = {
      business_categories: business_categories.toString(),
      cities: cities.toString(),
      committees: committees.toString(),
      current_activity: current_activity.toString(),
      designations: designations.toString(),
      districts: districts.toString(),
      educations: educations.toString(),
      local_community: local_community.toString(),
      occupation: occupation.toString(),
      relations: relations.toString(),
      states: states.toString(),
      sub_casts: sub_casts.toString(),
      sub_community: sub_community.toString(),
      gotra: gotra.toString(),
    };

    const userCounts: UserCountsDTO = {
      matrimony_counts: matrimony_counts.toString(),
      status_counts: status_counts.toString(),
    };

    return {
      success: true,
      message: 'Data Retrieved Successfully',
      countList,
      userCounts,
    };
  }

  async getRecords(tableName: string, date?: string): Promise<GetMastersResponseDTO> {
    try {
      console.log('filterDateIST: ' + date);

      let filterDate = date ? new Date(date) : new Date(0); // Default to fetch all if no date is given

      // Ensure valid date object is created
      if (isNaN(filterDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // ✅ Convert to IST (Indian Standard Time UTC+5:30)
      const filterDateIST = new Date(filterDate.getTime() + 5.5 * 60 * 60 * 1000);

      // ✅ Fetch Active Records Updated After the Given Date
      const activeRecords = await this.prisma[tableName].findMany({
        where: {
          deleted: false,
          updated: { gt: filterDateIST },
        },
        select: { id: true, name: true },
      });
      // Fetch deleted records (deleted = true) and updated after the given date
      const deletedRecords = await this.prisma[tableName].findMany({
        where: {
          deleted: true,
          updated: { gt: filterDate },
        },
        select: { id: true },
      });

      // Get the latest updated timestamp
      const lastUpdatedRecord = await this.prisma[tableName].findFirst({
        orderBy: { updated: 'desc' },
        select: { updated: true },
      });

      return {
        success: true,
        message: null,
        data: activeRecords.map((record) => ({
          id: record.id.toString(),
          name: record.name,
        })),
        deleted: deletedRecords.map((record) => record.id.toString()),
        last_updated: lastUpdatedRecord
          ? Math.floor(lastUpdatedRecord.updated.getTime() / 1000)
          : 0,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Error retrieving records',
        data: [],
        deleted: [],
        last_updated: 0,
      };
    }
  }

  async getCitiesByState(stateId: number, date?: string, subCommunityId?: number) {
    let dateFilter = undefined;

    if (date) {
      const parsedDate = new Date(Number(date));
      if (!isNaN(parsedDate.getTime())) {
        dateFilter = parsedDate;
      }
    }

    let cities = await this.prisma.city.findMany({
      where: {
        states_id: stateId,
        ...(dateFilter && { updated: { gte: dateFilter } }),
      },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });

    // If no cities found, return empty response
    if (!cities.length) return { data: [], deleted: [], last_updated: null };

    // Fetch user count for each city
    const cityCounts = await Promise.all(
      cities.map(async (city) => {
        const count = await this.prisma.userAddress.count({
          where: {
            city_id: city.id,
            user: {
              is_expired: false,
              status: true,
              sub_community_id: subCommunityId ? subCommunityId : undefined,
            },
          },
        });

        return { ...city, count };
      }),
    );

    // Sort by count (desc) then by name (asc)
    cityCounts.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    // Filter out cities with zero users
    const filteredCities = cityCounts.filter((city) => city.count > 0);

    // Fetch deleted and last updated city records
    const deletedCities = await this.prisma.city.findMany({
      where: { deleted: true },
      select: { id: true },
    });

    const lastUpdatedCity = await this.prisma.city.findFirst({
      orderBy: { updated: 'desc' },
      select: { updated: true },
    });

    console.log('filteredCities: ', JSON.stringify(filteredCities));

    return {
      data: filteredCities,
      deleted: deletedCities.map((c) => c.id),
      last_updated: lastUpdatedCity?.updated?.toISOString() || null,
    };
  }

  async getStatistics(input: StatisticsInputDto): Promise<StatisticsResponseDto> {
    const { cityId, subCommunityId, localCommunityId } = input;

    // Common filter conditions
    const baseFilter = {
      is_expired: false,
      ...(subCommunityId && { sub_community_id: subCommunityId }),
      ...(localCommunityId && { local_community_id: localCommunityId }),
      ...(cityId && { userAddress: { city_id: cityId } }), // Use city_id from UserAddress relation
    };

    // Get current year
    const currentYear = new Date().getFullYear();

    // Define birth date conditions
    const boyDate = new Date(`${currentYear - 21}-01-01`);
    const girlDate = new Date(`${currentYear - 18}-01-01`);

    // Fetch statistics using Prisma queries
    const [
      totalFamily,
      totalMembers,
      totalMale,
      totalFemale,
      totalUnmarriedMale,
      totalUnmarriedFemale,
      totalInterestedMale,
      totalInterestedFemale,
    ] = await Promise.all([
      this.prisma.user.count({ where: { ...baseFilter, head_id: 0 } }),
      this.prisma.user.count({ where: baseFilter }),
      this.prisma.user.count({ where: { ...baseFilter, gender: true } }),
      this.prisma.user.count({ where: { ...baseFilter, gender: false } }),
      this.prisma.user.count({
        where: {
          ...baseFilter,
          gender: true,
          userPersonalDetail: { marital_status: 'Unmarried', birth_date: { gte: boyDate } },
        },
      }),
      this.prisma.user.count({
        where: {
          ...baseFilter,
          gender: false,
          userPersonalDetail: { marital_status: 'Unmarried', birth_date: { gte: girlDate } },
        },
      }),
      this.prisma.user.count({
        where: {
          ...baseFilter,
          gender: true,
          userPersonalDetail: { matrimony: true },
        },
      }),
      this.prisma.user.count({
        where: {
          ...baseFilter,
          gender: false,
          userPersonalDetail: { matrimony: true },
        },
      }),
    ]);

    return {
      success: true,
      data: {
        TotalFamily: totalFamily,
        TotalMembers: totalMembers,
        TotalMale: totalMale,
        TotalFemale: totalFemale,
        TotalUnmarriedMale: totalUnmarriedMale,
        TotalUnmarriedFemale: totalUnmarriedFemale,
        TotalInterestedMale: totalInterestedMale,
        TotalInterestedFemale: totalInterestedFemale,
      },
    };
  }
}
