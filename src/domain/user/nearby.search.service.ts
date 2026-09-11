import { Injectable } from '@nestjs/common';
import { getDistance } from 'geolib';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetNearbyUsersInput } from './dto/user.nearby.dto';
import { SearchResult } from './dto/model/app.search.dto';

@Injectable()
export class NearBySearchService {
  constructor(private prisma: PrismaService) {}

  async getNearByUsers(input: GetNearbyUsersInput): Promise<SearchResult> {
    const { lat, lng, km, nearBy, subCommunityId, user_id, start = 0, length = 10 } = input;

    // Legacy: nearBy in ('Home','Office','User') pins that address type with a
    // HAVING distance <= km; otherwise home+office candidates are checked and
    // any non-empty distance string passes (no per-type enable gate on the
    // combined path, `User` live location is only used when explicitly asked).
    const locationTypes =
      nearBy === 'Home'
        ? ['Home']
        : nearBy === 'Office'
        ? ['Office']
        : nearBy === 'User'
        ? ['User']
        : ['Home', 'Office'];

    const users = await this.prisma.user.findMany({
      where: {
        status: true,
        // Legacy `if ($cleanerIds != "")` excludes the requesting user.
        ...(user_id ? { id: { not: user_id } } : {}),
        ...(subCommunityId && { sub_community_id: subCommunityId }),
        userLocations: {
          some: {
            location_type: { in: locationTypes },
            // Legacy combined ("All") path does not gate on is_location_enable
            // (only the explicit 'User' path required it).
            ...(nearBy === 'User' ? { is_location_enable: true } : {}),
          },
        },
      },
      include: {
        userLocations: true,
      },
    });

    const filteredUsers = users
      .map((user) => {
        let locationsInRange = [];

        user.userLocations.forEach((location) => {
          if (locationTypes.includes(location.location_type)) {
            const distance =
              getDistance(
                { latitude: lat, longitude: lng },
                { latitude: location.latitude, longitude: location.longitude },
              ) / 1000; // Convert meters to KM

            if (distance <= km) {
              locationsInRange.push({
                type: location.location_type.toLowerCase(),
                distance,
              });
            }
          }
        });

        return locationsInRange.length > 0 ? { ...user, nearByLocations: locationsInRange } : null;
      })
      .filter((user) => user)
      .sort((a, b) => {
        const minDistanceA = Math.min(...a.nearByLocations.map((loc) => loc.distance));
        const minDistanceB = Math.min(...b.nearByLocations.map((loc) => loc.distance));
        return minDistanceA - minDistanceB;
      });

    const totalRecords = filteredUsers.length;
    const paginatedUsers = filteredUsers.slice(start, start + length);

    return {
      totalRecords,
      members: paginatedUsers.map((user) => ({
        ...user,
        nearBy: user.nearByLocations.map((loc) => loc.type).join(', '),
        distance: user.nearByLocations.map((loc) => loc.distance).join(', '),
      })),
    };
  }
}
