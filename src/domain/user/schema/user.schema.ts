import { Int, Field, ObjectType, Float, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role', // GraphQL name
});

@ObjectType()
export class UserSchema {
  @Field(() => Int)
  id: number;

  @Field(() => Role, { defaultValue: Role.USER })
  role: Role;

  @Field(() => Int, { defaultValue: 0 })
  head_id: number;

  @Field({ nullable: true })
  member_code?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field()
  password: string;

  @Field(() => Int, { nullable: true })
  relationship_id?: number;

  @Field(() => Int, { nullable: true })
  sub_community_id?: number;

  @Field(() => Int, { nullable: true })
  local_community_id?: number;

  @Field()
  first_name: string;

  @Field(() => Int)
  last_name_id: number;

  @Field({ nullable: true })
  father_name?: string;

  @Field({ nullable: true })
  mother_name?: string;

  @Field({ defaultValue: true })
  status: boolean;

  @Field()
  gender: string;

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

  @Field(() => Float, { defaultValue: 5 })
  profile_percent: number;
}
