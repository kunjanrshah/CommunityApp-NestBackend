import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Reminder {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  rem_date: Date;

  @Field()
  rem_type: string;

  @Field()
  message: string;
}
