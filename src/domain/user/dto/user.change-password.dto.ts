import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @MinLength(1, { message: 'Current password is required' })
  currentPassword: string;

  // Password policy stays in sync with the auth module's ResetPasswordInput
  // (@MinLength(8)) so a password chosen here also satisfies the
  // forgotPassword -> resetPassword flow.
  @Field()
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  newPassword: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field()
  message: string;
}
