import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class SearchCommitteeUsersResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Int)
  total_records: number;

  @Field(() => [UserDTO], { nullable: true })
  members?: UserDTO[];
}
