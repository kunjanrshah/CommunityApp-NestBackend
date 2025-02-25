import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { AddUserArgs } from './args/user.add.args';
import { UpdateUserArgs } from './args/user.update.args';
import { UseGuards } from '@nestjs/common';
import { Role } from 'src/graphql';
import { ChangePasswordInput, ChangePasswordResponse } from './args/user.change-password.args';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  getProtectedData(@Context() context) {
    return `Hello ${context.req.user.email}, this is protected data!`;
  }

  @Query(() => UserSchema)
  findUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.findUserById(id);
  }

  @Query(() => UserSchema)
  findUserByMobile(@Args({ name: 'mobile', type: () => String }) mobile: string) {
    return this.userService.findUserByMobile(mobile);
  }

  @Query(() => [UserSchema])
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => String)
  deleteUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => UserSchema)
  addUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return this.userService.addUser(addUserArgs);
  }

  @Mutation(() => UserSchema)
  updateUser(
    @Args({ name: 'userId', type: () => Int }) id: number,
    @Args('updateUserArgs') updateUserArgs: UpdateUserArgs,
  ) {
    return this.userService.updateUser(id, updateUserArgs);
  }

  @Query(() => String)
  @Roles(Role.USER)
  @UseGuards(GqlAuthGuard, RolesGuard)
  securedResourceforUser(@Context('user') user: UserSchema) {
    return 'This is Secured Resource' + JSON.stringify(user);
  }

  @Query(() => String)
  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  securedResourceforAdmin(@Context('user') user: UserSchema) {
    return 'This is Secured Resource' + JSON.stringify(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChangePasswordResponse)
  async changePassword(@Args('input') input: ChangePasswordInput, @Context() context) {
    const userId = context.req.user.userId; // Extract user ID from token
    return this.userService.changePassword(userId, input.currentPassword, input.newPassword);
  }
}
