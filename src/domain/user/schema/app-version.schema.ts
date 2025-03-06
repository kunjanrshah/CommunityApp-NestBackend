import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppVersionModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  version: number;
}
