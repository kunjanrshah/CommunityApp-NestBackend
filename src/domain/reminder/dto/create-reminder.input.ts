import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReminderInput {
  @Field()
  user_id: number;

  @Field()
  rem_date: Date;

  @Field()
  rem_type: string;

  @Field()
  message: string;
}
