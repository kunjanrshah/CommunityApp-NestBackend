import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class ChangeRoleInput {
  @Field(() => [Number])
  @IsArray()
  @IsNotEmpty()
  idList: number[];

  @Field(() => String)
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  subCommunityId?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  localCommunityId?: number;
}
