import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

@InputType()
export class GetContactListInput {
  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  mobiles: string[];
}
