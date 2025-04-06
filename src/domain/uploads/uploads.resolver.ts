import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { UploadsService } from './uploads.service';
import { UploadModel } from './model/uploads.model';
import { FileUpload } from './types/file-upload.interface';

@Resolver(() => UploadModel)
export class UploadsResolver {
  constructor(private readonly uploadsService: UploadsService) {}

  @Mutation(() => UploadModel)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<UploadModel> {
    return this.uploadsService.uploadFile(file, user_id);
  }

  @Query(() => [UploadModel])
  async getUserFiles(@Args('user_id', { type: () => Int }) user_id: number) {
    return this.uploadsService.getFilesByUser(user_id);
  }

  @Mutation(() => UploadModel)
  async deleteUserFile(
    @Args('id', { type: () => Int }) id: number,
    @Args('user_id', { type: () => Int }) user_id: number,
  ) {
    return this.uploadsService.deleteFile(id, user_id);
  }
}
