import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class SearchByCityResponse {
  @Field()
  success: boolean;

  @Field(() => Int, {
    description: 'Number of head users (rows) that matched the filter before pagination.',
  })
  totalHead: number;

  @Field(() => Int, {
    description: 'Total count of family members headed under all matched head users.',
  })
  totalMem: number;

  @Field(() => [UserDTO])
  members: UserDTO[];
}
