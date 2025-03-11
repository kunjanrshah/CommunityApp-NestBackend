import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MasterDTO {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class GetMastersResponseDTO {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => [MasterDTO])
  data: MasterDTO[];

  @Field(() => [String])
  deleted: string[];

  @Field(() => Int)
  last_updated: number;
}
