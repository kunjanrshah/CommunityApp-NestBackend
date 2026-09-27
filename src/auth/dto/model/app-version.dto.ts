import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AppVersionDto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  version: number;
}
