import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DateInputDto {
  @Field({ nullable: true })
  date?: string;
}
