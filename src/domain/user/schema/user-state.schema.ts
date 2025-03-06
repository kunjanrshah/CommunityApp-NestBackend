import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StateModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
