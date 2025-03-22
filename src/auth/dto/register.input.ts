import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsInt, IsString, Length } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  first_name: string;

  @Field(() => Int)
  @IsInt()
  last_name_id: number;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @Length(6, 10, { message: 'Mobile must be between 6 and 10 characters' })
  mobile: string;

  @Field()
  @Length(6, 15, { message: 'Password must be between 6 and 15 characters' })
  password: string;

  @Field(() => Int)
  @IsInt()
  sub_community_id: number;

  @Field(() => Int)
  @IsInt()
  local_community_id: number;

  @Field(() => Boolean)
  @IsBoolean()
  gender: boolean;

  @Field({ defaultValue: 'noimage.png' })
  @IsString()
  profile_pic: string;

  @Field(() => Int)
  @IsInt()
  states_id: number;

  @Field(() => Int)
  @IsInt()
  city_id: number;

  @Field()
  @IsString()
  address: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  message: string;
}
