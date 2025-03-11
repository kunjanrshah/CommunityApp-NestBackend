import { Resolver, Query, Args, Mutation, Context, Int } from '@nestjs/graphql';
import { UserDTO } from './dto/model/user.dto';
import { UserService } from './user.service';
import { UpsertUserInput } from './dto/user.upsert.dto';
import { ChangePasswordInput, ChangePasswordResponse } from './dto/user.change-password.dto';
import { Roles } from 'src/roles.decorator';
import { Role, User } from '@prisma/client';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  @Roles(Role.ADMIN)
  securedResourceforAdmin(@Context('user') user: UserDTO) {
    return 'This is Secured Resource' + JSON.stringify(user);
  }

  @Mutation(() => ChangePasswordResponse)
  async changePassword(
    @Args('ChangePasswordInput') changePasswordInput: ChangePasswordInput,
    @Context() context,
  ) {
    const userId = context.req.user.userId; // Extract user ID from token
    return this.userService.changePassword(
      userId,
      changePasswordInput.currentPassword,
      changePasswordInput.newPassword,
    );
  }

  @Mutation(() => UserDTO)
  async upsertUser(@Args('upsertUserInput') upsertUserInput: UpsertUserInput): Promise<User> {
    return this.userService.upsertUser(upsertUserInput);
  }

  @Mutation(() => Boolean)
  async updateLastLogin(@Args('user_id', { type: () => Int }) user_id: number): Promise<boolean> {
    return this.userService.updateLastLogin(user_id);
  }

  // @Query(() => String)
  // getProtectedData(@Context() context) {
  //   return `Hello ${context.req.user.email}, this is protected data!`;
  // }

  // @Query(() => UserSchema)
  // findUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
  //   return this.userService.findUserById(id);
  // }

  // @Query(() => UserSchema)
  // findUserByMobile(@Args({ name: 'mobile', type: () => String }) mobile: string) {
  //   return this.userService.findUserByMobile(mobile);
  // }

  // @Query(() => [UserSchema])
  // getAllUsers() {
  //   return this.userService.getAllUsers();
  // }

  // @Query(() => [UserSchema])
  // getAllUsersByFilter() {
  //   return this.userService.getAllUsersByFilter();
  // }

  // @Mutation(() => String)
  // deleteUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
  //   return this.userService.deleteUser(id);
  // }

  // @Mutation(() => UserSchema)
  // updateUser(
  //   @Args({ name: 'userId', type: () => Int }) id: number,
  //   @Args('updateUserArgs') updateUserArgs: UpdateUserArgs,
  // ) {
  //   return this.userService.updateUser(id, updateUserArgs);
  // }

  // @Query(() => String)
  // @Roles(Role.USER)
  // securedResourceforUser(@Context('user') user: UserSchema) {
  //   return 'This is Secured Resource' + JSON.stringify(user);
  // }
}
