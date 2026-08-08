import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export enum LocationType {
  HOME = 'Home',
  OFFICE = 'Office',
  USER = 'User',
}

registerEnumType(LocationType, {
  name: 'LocationType', // GraphQL name
});

@ObjectType()
export class UserLocationDTO {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @IsNumber()
  user_id: number;

  @Field(() => LocationType)
  @IsEnum(LocationType)
  location_type: LocationType;

  @Field(() => Float)
  @IsNumber()
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  longitude: number;

  @Field(() => String)
  @IsString()
  sharing_id: string;

  @Field(() => Boolean)
  @IsBoolean()
  is_location_enable: boolean;
}
