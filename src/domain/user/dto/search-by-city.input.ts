import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchByCityInput {
  @Field(() => Int, {
    nullable: true,
    description: 'City id to filter users (matches the user’s address city).',
  })
  @IsOptional()
  @IsInt()
  cityId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  subCommunityId?: number;

  @Field({
    nullable: true,
    description: 'Filter users whose first_name starts with this alphabet (e.g. "A").',
  })
  @IsOptional()
  @IsString()
  alpha?: string;

  @Field({
    nullable: true,
    description:
      'Free text searched across member_code, first_name, mobile, email, city and state.',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  start?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  length?: number;
}
