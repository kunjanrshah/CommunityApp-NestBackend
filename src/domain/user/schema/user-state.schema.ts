import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StateSchema {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
