import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @Length(10, 10)
  mobile: string;

  @Field()
  @IsString()
  password: string;
}
