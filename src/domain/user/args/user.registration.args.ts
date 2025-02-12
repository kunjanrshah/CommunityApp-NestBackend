import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterUserArgs {
  @Field()
  first_name?: string;

  @Field(() => Int)
  last_name_id?: number;

  @Field()
  email_address?: string;

  @Field()
  mobile?: string;

  @Field()
  password?: string;

  @Field(() => Int)
  sub_community_id?: number;

  @Field(() => Int)
  local_community_id?: number;

  @Field(() => Int)
  state_id?: number;

  @Field(() => Int)
  city_id?: number;

  @Field()
  address?: string;

  @Field(() => Boolean)
  gender?: boolean;

  @Field({ defaultValue: 'noimage.png' })
  profile_pic: string;
}
