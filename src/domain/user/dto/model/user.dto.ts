import { Int, Field, ObjectType, Float, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { UserAddressDTO } from './user-address.dto';
import { UserMatrimonyDTO } from './user-matrimony.dto';
import { UserPersonalDetailDTO } from './user-personal-details.dto';
import { UserWorkDetailDTO } from './user-work-details.dto';

registerEnumType(Role, {
  name: 'Role', // GraphQL name
});

@ObjectType()
export class UserDTO {
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
  relation_id?: number;

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

  @Field(() => Float, { defaultValue: 5 })
  profile_percent: number;

  @Field({ nullable: true })
  updated?: Date;

  @Field(() => UserAddressDTO, { nullable: true }) // Include Address as part of the User response
  userAddress?: UserAddressDTO;

  @Field(() => UserMatrimonyDTO, { nullable: true }) // Include Address as part of the User response
  userMatrimony?: UserMatrimonyDTO;

  @Field(() => UserPersonalDetailDTO, { nullable: true }) // Include Address as part of the User response
  userPersonalDetail?: UserPersonalDetailDTO;

  @Field(() => UserWorkDetailDTO, { nullable: true }) // Include Address as part of the User response
  userWorkDetail?: UserWorkDetailDTO;

  @Field(() => [String], { nullable: true })
  matchedFields?: string[];

  @Field(() => String, { nullable: true })
  distance?: string; //"3.2, 5.6"

  @Field(() => String, { nullable: true })
  nearBy?: string; // "home", "office", or "user"
}
