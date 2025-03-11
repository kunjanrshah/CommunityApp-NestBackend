import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { AddrType, Role } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';

registerEnumType(AddrType, {
  name: 'AddrType', // 👈 This name should match the Prisma enum
  description: 'The type of address (OWN or RENTED)',
});

@InputType()
export class UpsertUserInput {
  @Field(() => Int, { nullable: true }) // If provided, update the user
  @IsOptional()
  @IsInt()
  user_id?: number;

  // @Field(() => Int, { nullable: true }) // If provided, update the user
  // @IsOptional()
  // @IsInt()
  // address_id?: number;

  @Field(() => Role, { defaultValue: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  head_id: number;

  @Field({ nullable: true })
  @IsOptional()
  member_code?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Mobile should not be empty' })
  @Length(6, 15, { message: 'Mobile must be between 6 and 15 characters' })
  mobile?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  relation_id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  sub_community_id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  local_community_id: number;

  @Field({ nullable: true })
  @IsOptional()
  first_name: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  last_name_id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'FatherName should not be empty' })
  father_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'MotherName should not be empty' })
  mother_name?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  gender: boolean;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @Field({ defaultValue: 'noimage.png' })
  @IsOptional()
  profile_pic: string;

  @Field({ nullable: true })
  @IsOptional()
  region?: string;

  @Field({ defaultValue: false })
  @IsOptional()
  is_expired: boolean;

  @Field({ nullable: true })
  @IsOptional()
  expire_date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  education_id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  occupation_id?: number;

  @Field({ defaultValue: false })
  @IsOptional()
  deleted: boolean;

  @Field({ nullable: true })
  @IsOptional()
  login_status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  last_login?: Date;

  @Field(() => Int, { defaultValue: 5 })
  profile_percent: number;

  // ** User Adress Details **
  @Field(() => Int, { nullable: true })
  @IsOptional()
  city_id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  state_id: number;

  @Field(() => AddrType, { defaultValue: AddrType.OWN })
  addr_type: AddrType;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 255, { message: 'Address must be between 5 and 255 characters' })
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 100, { message: 'Area must be between 2 and 100 characters' })
  area?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(4, 10, { message: 'Pincode must be between 4 and 10 characters' })
  pincode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 255, { message: 'Local address must be between 5 and 255 characters' })
  local_address?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  mosaad_id?: number;

  // **User Personal Details**
  @Field({ defaultValue: false })
  @IsOptional()
  is_donor?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  matrimony?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  birth_date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  native_place_id?: number;

  @Field({ nullable: true })
  @IsOptional()
  blood_group?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  current_activity_id?: number;

  @Field({ nullable: true })
  @IsOptional()
  marital_status?: string;

  @Field({ nullable: true })
  @IsOptional()
  marriage_date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  gotra_id?: number;

  // **User Work Details**
  @Field(() => Int, { nullable: true })
  @IsOptional()
  business_category_id?: number;

  @Field({ nullable: true })
  @IsOptional()
  business_address?: string;

  @Field({ nullable: true })
  @IsOptional()
  business_logo?: string;

  @Field({ nullable: true })
  @IsOptional()
  company_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  work_details?: string;

  // **User Matrimony Details**
  @Field({ nullable: true })
  @IsOptional()
  birth_time?: string;

  @Field({ nullable: true })
  @IsOptional()
  birth_place?: string;

  @Field({ nullable: true })
  @IsOptional()
  hobby?: string;

  @Field({ nullable: true })
  @IsOptional()
  about_me?: string;

  @Field({ nullable: true })
  @IsOptional()
  weight?: number;

  @Field({ nullable: true })
  @IsOptional()
  height?: number;

  @Field({ defaultValue: false })
  @IsOptional()
  is_spect?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  is_mangal?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  is_shani?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  facebook_profile?: string;

  @Field({ nullable: true })
  @IsOptional()
  expectation?: string;
}
