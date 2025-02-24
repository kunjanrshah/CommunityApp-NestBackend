import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  first_name: string;

  @Field(() => Int)
  last_name_id: number;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @Length(6, 15, { message: 'Mobile must be between 6 and 15 characters' })
  mobile: string;

  @Field()
  @Length(6, 15, { message: 'Password must be between 6 and 15 characters' })
  password: string;

  @Field(() => Int)
  sub_community_id: number;

  @Field(() => Int)
  local_community_id: number;

  @Field(() => Boolean)
  gender: boolean;

  @Field({ defaultValue: 'noimage.png' })
  profile_pic: string;

  @Field(() => Int)
  state_id: number;

  @Field(() => Int)
  city_id: number;

  @Field()
  address: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  message: string;
}
