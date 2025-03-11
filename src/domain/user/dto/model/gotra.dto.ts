import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

@ObjectType()
export class GotraDTO {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsBoolean()
  deleted: boolean;

  @Field()
  @IsDate()
  updated: Date;
}
