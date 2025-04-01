import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class StatisticsInputDto {
  @Field(() => Int, { nullable: true })
  @IsInt()
  cityId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  subCommunityId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  localCommunityId?: number;
}
