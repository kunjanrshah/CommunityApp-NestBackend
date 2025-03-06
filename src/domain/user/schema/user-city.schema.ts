import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  state_id: number;
}
