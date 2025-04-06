import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { FileUpload } from '../types/file-upload.interface';

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field()
  user_id: number;
}
