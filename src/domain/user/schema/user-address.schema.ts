import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAddress {
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

  @Field({ nullable: true, defaultValue: false })
  is_rented?: boolean;
}
