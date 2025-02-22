import { InputType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class AddUserArgs {
  @Field(() => Role, { defaultValue: Role.USER })
  role: Role;

  @Field(() => Int, { defaultValue: 0 })
  head_id: number;

  @Field({ nullable: true })
  member_code?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email_address?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Mobile should not be empty' })
  @Length(6, 15, { message: 'Mobile must be between 6 and 15 characters' })
  mobile?: string;

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @Field(() => Int, { nullable: true })
  relationship_id?: number;

  @Field(() => Int)
  sub_community_id: number;

  @Field(() => Int)
  local_community_id: number;

  @Field()
  @IsNotEmpty({ message: 'FirstName should not be empty' })
  first_name: string;

  @Field(() => Int)
  last_name_id: number;

  @Field({ nullable: true })
  @IsNotEmpty({ message: 'FatherName should not be empty' })
  father_name?: string;

  @Field()
  @IsNotEmpty({ message: 'MotherName should not be empty' })
  mother_name?: string;

  @Field({ defaultValue: true })
  status: boolean;

  @Field()
  gender: boolean;

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

  @Field(() => Int, { defaultValue: 5 })
  profile_percent: number;
}
