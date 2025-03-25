import { Args, Query, Resolver } from '@nestjs/graphql';
import { SmartSearchService } from './smart.search.service';
import { SearchInput } from './dto/smart.search.dto';
import { SearchRequestDTO } from './dto/smart.filter.dto';
import { SmartFilterService } from './smart.filter.service';
import { SearchResult } from './dto/model/app.search.dto';
import { GetNearbyUsersInput } from './dto/user.nearby.dto';
import { NearBySearchService } from './nearby.search.service';

@Resolver()
export class AppSearchResolver {
  constructor(
    private readonly smartSearchService: SmartSearchService,
    private readonly smartFilterService: SmartFilterService,
    private readonly nearBySearchService: NearBySearchService,
  ) {}

  @Query(() => SearchResult)
  async smartSearch(@Args('input') input: SearchInput) {
    return this.smartSearchService.smartSearch(input.start, input.length, input.filterBy);
  }

  @Query(() => SearchResult)
  async smartFilter(@Args('input') params: SearchRequestDTO) {
    return this.smartFilterService.smartFilter(params);
  }

  @Query(() => SearchResult)
  async nearByUsers(@Args('filter') filter: GetNearbyUsersInput) {
    return this.nearBySearchService.getNearByUsers(filter);
  }
}
