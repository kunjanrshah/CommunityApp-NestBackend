import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class SearchInput {
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  start: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  length: number;

  @Field({ nullable: true })
  @IsString()
  filterBy?: string;
}
