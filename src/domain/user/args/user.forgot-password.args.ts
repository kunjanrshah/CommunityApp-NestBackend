import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordArgs {
  @Field()
  email: string;
}
