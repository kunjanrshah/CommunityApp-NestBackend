import { ObjectType, Field } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class GetContactListResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [UserDTO], { nullable: true }) // Return full user objects
  members?: UserDTO[];
}
