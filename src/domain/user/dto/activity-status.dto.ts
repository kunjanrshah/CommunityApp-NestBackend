import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetUserActivityStatusInput {
  // NOTE: the class-validator decorators below are mandatory. The app installs a
  // global `ValidationPipe({ whitelist: true, transform: true })` (src/main.ts).
  // @nestjs/common defaults `forbidUnknownValues` to false, so for an input class
  // without any class-validator metadata class-validator never reaches the
  // "unknown value" branch and the whitelist pass deletes EVERY property of the
  // object. `id` then arrives as `undefined` and getUserActivityStatus() always
  // returned "Not User found" without touching the database.
  // `@Min(1)` is intentionally NOT used: the legacy REST endpoint answered
  // `{ success: false, message: 'Not User found' }` for id 0, and the service
  // keeps that behaviour via its `if (!id)` guard.
  @Field(() => Int)
  @IsInt()
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
