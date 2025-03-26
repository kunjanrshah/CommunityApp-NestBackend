import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityDTO {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
