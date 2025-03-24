import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CountListDTO {
  @Field(() => String)
  business_categories: string;

  @Field(() => String)
  cities: string;

  @Field(() => String)
  committees: string;

  @Field(() => String)
  current_activity: string;

  @Field(() => String)
  designations: string;

  @Field(() => String)
  districts: string;

  @Field(() => String)
  educations: string;

  @Field(() => String)
  local_community: string;

  @Field(() => String)
  occupation: string;

  @Field(() => String)
  relations: string;

  @Field(() => String)
  states: string;

  @Field(() => String)
  sub_casts: string;

  @Field(() => String)
  sub_community: string;

  @Field(() => String)
  gotra: string;
}

@ObjectType()
export class UserCountsDTO {
  @Field(() => String)
  matrimony_counts: string;

  @Field(() => String)
  status_counts: string;
}

@ObjectType()
export class MastersCountResponseDTO {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;

  @Field(() => CountListDTO)
  countList: CountListDTO;

  @Field(() => UserCountsDTO)
  userCounts: UserCountsDTO;
}
