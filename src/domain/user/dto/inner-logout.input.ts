import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class InnerLogoutInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;
}
