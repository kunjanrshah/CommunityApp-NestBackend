import { Args, Query, Resolver, ObjectType, Field, Int } from '@nestjs/graphql';
import { AppSearchService } from './appsearch.service';
import { SearchInput } from './dto/smart.search.dto';
import { UserDTO } from './dto/model/user.dto';

@ObjectType()
class SearchResult {
  @Field(() => Int)
  totalRecords: number;

  @Field(() => [UserDTO])
  members: UserDTO[];
}

@Resolver()
export class AppSearchResolver {
  constructor(private readonly usersService: AppSearchService) {}

  @Query(() => SearchResult)
  async smartSearch(@Args('input') input: SearchInput) {
    return this.usersService.smartSearch(input.start, input.length, input.filterBy);
  }
}
