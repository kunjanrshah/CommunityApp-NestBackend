import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class SearchCommitteeUsersInput {
  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  start: number;

  @Field(() => Int, { defaultValue: 25 })
  @IsOptional()
  @IsInt()
  @Min(1)
  length: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  filterBy?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  committeeId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  designationId?: number;
}
