import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CountListDTO,
  MastersCountResponseDTO,
  UserCountsDTO,
} from './dto/model/masters-count.dto';
import { GetMastersResponseDTO } from './dto/model/get-masters.dto';

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
}
