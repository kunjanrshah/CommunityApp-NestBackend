import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './model/user.dto';

@InputType()
export class GetUsersByDateInput {
  @Field({ nullable: true })
  fromdate?: string; // Format: "YYYY-MM-DD"

  @Field({ nullable: true })
  todate?: string; // Format: "YYYY-MM-DD"

  @Field({ nullable: true })
  date?: string; // Alternate single-date filter (Format: "YYYY-MM-DD")

  @Field(() => Int, { nullable: true })
  filter?: number; // 0 = birth_date, 1 = marriage_date, 2 = expire_date

  @Field(() => Int, { nullable: true })
  id?: number; // login/user id to compute reminder flags

  @Field(() => Int, { nullable: true })
  sub_community_id?: number;

  @Field(() => Int, { defaultValue: 0 })
  start?: number;

  @Field(() => Int, { defaultValue: 25 })
  length?: number;
}

@ObjectType()
export class GetUsersByDateResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Int)
  total_records: number;

  @Field(() => [UserDTO])
  members: UserDTO[];
}
