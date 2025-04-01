import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class StatisticsDataDto {
  @Field(() => Int)
  @IsInt()
  TotalFamily: number;

  @Field(() => Int)
  @IsInt()
  TotalMembers: number;

  @Field(() => Int)
  @IsInt()
  TotalMale: number;

  @Field(() => Int)
  @IsInt()
  TotalFemale: number;

  @Field(() => Int)
  @IsInt()
  TotalUnmarriedMale: number;

  @Field(() => Int)
  @IsInt()
  TotalUnmarriedFemale: number;

  @Field(() => Int)
  @IsInt()
  TotalInterestedMale: number;

  @Field(() => Int)
  @IsInt()
  TotalInterestedFemale: number;
}

@ObjectType()
export class StatisticsResponseDto {
  @Field()
  success: boolean;

  @Field(() => StatisticsDataDto)
  data: StatisticsDataDto;
}
