import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class SearchResult {
  @Field(() => Int)
  totalRecords: number;

  @Field(() => [UserDTO!]!)
  members: UserDTO[];
}
