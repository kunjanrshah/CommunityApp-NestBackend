import { Resolver, Query, Args, Mutation, Context, Int } from '@nestjs/graphql';
import { UserDTO } from './dto/model/user.dto';
import { UserService } from './user.service';
import { UpsertUserInput } from './dto/user.upsert.dto';
import { ChangePasswordInput, ChangePasswordResponse } from './dto/user.change-password.dto';
import { User } from '@prisma/client';
import { ChangeRoleInput } from './dto/change-role.dto';
import { GetInactiveUsersInput } from './dto/get-inactive-users.dto';
import { StatusChangeInputDto } from './dto/status-change-input.dto';
import { StatusChangeResponseDto } from './dto/model/status-change-response.dto';
import { StatusChangeService } from './status-change.service';
import { GetContactListResponse } from './dto/model/get-contact-list.response';
import { GetContactListInput } from './dto/get-contact-list.input';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly statusChangeService: StatusChangeService,
  ) {}

  // @Query(() => String)
  // @Roles(Role.ADMIN)
  // securedResourceforAdmin(@Context('user') user: UserDTO) {
  //   return 'This is Secured Resource' + JSON.stringify(user);
  // }

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

  @Query(() => [UserDTO])
  async getFamilyMembers(@Args('head_id', { type: () => Number }) head_id: number) {
    return this.userService.getFamilyMembers(head_id);
  }

  @Query(() => [UserDTO], { name: 'usersByDateRange' })
  async getUsersByDateRange(
    @Args('fromDate') fromDate: string,
    @Args('toDate') toDate: string,
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return this.userService.getUsersByDateRange(fromDate, toDate, page, limit);
  }

  @Query(() => [UserDTO])
  async getInactiveUsers(@Args('input') input: GetInactiveUsersInput) {
    return this.userService.getInactiveUsers(input);
  }

  @Query(() => [UserDTO])
  async getSharedProfiles(@Args('userId', { type: () => Int }) userId: number) {
    return this.userService.getSharedProfiles(userId);
  }

  @Query(() => [UserDTO])
  async getSharingProfiles(@Args('userId', { type: () => Int }) userId: number) {
    return this.userService.getSharingProfiles(userId);
  }

  @Mutation(() => String)
  deleteUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String)
  async changeRole(@Args('input') input: ChangeRoleInput): Promise<string> {
    return this.userService.changeRole(input);
  }

  @Mutation(() => StatusChangeResponseDto)
  async statusChange(@Args('data') data: StatusChangeInputDto): Promise<StatusChangeResponseDto> {
    return this.statusChangeService.statusChange(data);
  }

  @Query(() => GetContactListResponse)
  async getContactList(@Args('input') input: GetContactListInput): Promise<GetContactListResponse> {
    return this.userService.getContactList(input);
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
