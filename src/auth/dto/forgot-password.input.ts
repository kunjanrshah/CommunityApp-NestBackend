import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mobile?: string;

  @Field({ defaultValue: 'email' })
  @IsIn(['email', 'mobile'], { message: 'resetType must be either "email" or "mobile"' })
  resetType: string;
}
