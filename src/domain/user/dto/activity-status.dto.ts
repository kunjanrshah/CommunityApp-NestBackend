import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserActivityStatusInput {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class UserActivityStatusDTO {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  last_login?: Date;

  @Field({ nullable: true })
  login_status?: boolean;

  @Field(() => Int)
  online_status: number;
}

@ObjectType()
export class GetUserActivityStatusResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [UserActivityStatusDTO], { nullable: true })
  data?: UserActivityStatusDTO[];
}
