import { InputType, PartialType } from '@nestjs/graphql';
import { AddUserArgs } from './user.add.args';

@InputType()
export class UpdateUserArgs extends PartialType(AddUserArgs) {}
