import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString } from 'class-validator';

@InputType()
export class GetNearbyUsersInput {
  @Field(() => Float)
  @IsNumber()
  lat: number;

  @Field(() => Float)
  @IsNumber()
  lng: number;

  @Field(() => Int, { defaultValue: 10 }) // Default 10km radius
  @IsInt()
  km: number;

  @Field(() => String, { nullable: true }) // Can be 'Home', 'Office', 'User'
  @IsString()
  nearBy?: 'Home' | 'Office' | 'User';

  @Field(() => Int, { nullable: true }) // Pagination - start index
  @IsInt()
  start?: number;

  @Field(() => Int, { nullable: true }) // Pagination - limit
  @IsInt()
  length?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  subCommunityId?: number;
}
