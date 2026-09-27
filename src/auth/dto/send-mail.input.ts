import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SendMailInput {
  @Field()
  @IsEmail()
  toEmail: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  body: string;
}
