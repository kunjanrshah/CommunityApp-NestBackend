import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class StatusChangeInputDto {
  @Field(() => String)
  @IsString()
  idList: string;

  @Field(() => Int)
  @IsInt()
  status: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  extra_info?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  password?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  relation_id?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  head_id?: number;
}
