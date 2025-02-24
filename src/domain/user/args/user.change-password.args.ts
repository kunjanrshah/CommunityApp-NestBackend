import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field()
  message: string;
}
