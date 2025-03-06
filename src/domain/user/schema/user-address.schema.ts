import { Int, Field, ObjectType } from '@nestjs/graphql';
import { AddrType } from '@prisma/client';

@ObjectType()
export class UserAddressModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  address: string;

  @Field(() => Int)
  city_id: number;

  @Field(() => Int)
  state_id: number;

  @Field({ nullable: true })
  local_address?: string;

  @Field(() => Int, { nullable: true })
  mosaad_id?: number;

  @Field({ nullable: true })
  area?: string;

  @Field({ nullable: true, defaultValue: '' })
  pincode?: string;

  @Field(() => AddrType, { defaultValue: AddrType.OWN }) // Include Address as part of the User
  addr_type: AddrType;
}
