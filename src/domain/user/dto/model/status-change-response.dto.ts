import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StatusChangeResponseDto {
  @Field(() => Boolean)
  success: boolean;

  @Field()
  message: string;
}
