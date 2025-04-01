import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetInactiveUsersInput {
  @Field(() => Int, { nullable: true })
  @IsInt()
  start?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  subCommunityId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  localCommunityId?: number;
}
