import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ObjectType()
export class CityDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  count: number;
}

@ObjectType()
export class CityResponseDto {
  @Field(() => [CityDto], { nullable: true })
  @IsInt({ each: true })
  data: CityDto[];

  @Field(() => [Int], { nullable: true })
  @IsInt({ each: true })
  deleted?: number[];

  @Field({ nullable: true })
  @IsString()
  last_updated?: string;
}
