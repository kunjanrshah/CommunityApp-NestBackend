import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class GetFamilyMembersResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Int)
  total_records: number;

  @Field(() => [UserDTO], { nullable: true })
  members?: UserDTO[];
}
