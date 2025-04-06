import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  file_name: string;

  @Field()
  file_path: string;

  @Field()
  updated: Date;
}
