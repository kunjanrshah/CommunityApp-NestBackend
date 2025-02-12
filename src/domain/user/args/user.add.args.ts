import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class AddUserArgs {

  @Field(() => Role , { nullable: true })
  role: Role;

  @Field(() => Int, { nullable: true })
  head_id?: number;

  @Field({ nullable: true })
  member_code?: string;

  @Field({ nullable: true })
  email_address?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  plain_password?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  relationship_id?: number;

  @Field(() => Int, { nullable: true })
  sub_community_id?: number;

  @Field(() => Int, { nullable: true })
  local_community_id?: number;

  @Field({ nullable: true })
  first_name?: string;

  @Field(() => Int, { nullable: true })
  last_name_id?: number;

  @Field({ nullable: true })
  father_name?: string;

  @Field({ nullable: true })
  mother_name?: string;

  @Field({ defaultValue: true })
  status: boolean;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ defaultValue: 'noimage.png' })
  profile_pic: string;

  @Field({ nullable: true })
  region?: string;

  @Field({ defaultValue: false })
  is_expired: boolean;

  @Field({ nullable: true })
  expire_date?: Date;

  @Field(() => Int, { nullable: true })
  education_id?: number;

  @Field(() => Int, { nullable: true })
  occupation_id?: number;

  @Field({ defaultValue: false })
  deleted: boolean;

  @Field({ nullable: true })
  login_status?: boolean;

  @Field({ nullable: true })
  last_login?: Date;

  @Field({ nullable: true })
  profile_password?: string;

  @Field(() => Int, { defaultValue: 5 })
  profile_percent: number;
}
