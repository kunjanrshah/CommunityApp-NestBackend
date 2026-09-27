import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class InnerLoginInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
