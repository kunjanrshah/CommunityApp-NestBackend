import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class GetUsersByDateRangeInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  fromDate: string; // Format: "YYYY-MM-DD"

  @Field()
  @IsNotEmpty()
  @IsString()
  toDate: string; // Format: "YYYY-MM-DD"

  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  limit: number;
}
