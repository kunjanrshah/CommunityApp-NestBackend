import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  mobile: string;

  @Field()
  password: string;
}
