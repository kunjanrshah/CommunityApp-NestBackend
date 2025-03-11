import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

@ObjectType()
export class UserPersonalDetailDTO {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => Int)
  @IsInt()
  user_id: number;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  is_donor?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  matrimony?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  birth_date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  native_place_id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  blood_group?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  current_activity_id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  marital_status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  marriage_date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  gotra_id?: number;
}
