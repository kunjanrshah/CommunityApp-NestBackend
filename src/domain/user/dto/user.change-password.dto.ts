import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  currentPassword: string;

  @Field()
  @IsString()
  newPassword: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field()
  message: string;
}
