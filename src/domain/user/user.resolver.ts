import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { AddUserArgs } from './args/user.add.args';
import { UpdateUserArgs } from './args/user.update.args';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/graphql';
import { RoleGuard } from 'src/auth/role.guard';
import { RegisterUserArgs } from './args/user.registration.args';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Role.USER))
  securedResourceforUser(@Context('user') user: UserSchema) {
    return 'This is Secured Resource' + JSON.stringify(user);
  }

  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Role.ADMIN))
  securedResourceforAdmin(@Context('user') user: UserSchema) {
    return 'This is Secured Resource' + JSON.stringify(user);
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'mobile', type: () => String }) mobile: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: UserSchema,
  ) {
    const payload = {
      id: user.id,
      head_id: user.head_id,
      member_code: user.member_code,
      first_name: user.first_name,
      last_name_id: user.last_name_id,
      mobile: user.mobile,
      email: user.email_address,
      role: user.role,
    };
    return jwt.sign(payload, 'secret', { expiresIn: '1h' });
  }

  @Query(() => [UserSchema])
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => UserSchema)
  findUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.findUserById(id);
  }

  @Query(() => UserSchema)
  findUserByMobile(@Args({ name: 'mobile', type: () => String }) mobile: string) {
    return this.userService.findUserByMobile(mobile);
  }

  @Mutation(() => String)
  deleteUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => UserSchema)
  registrationUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return this.userService.addUser(addUserArgs);
  }

  @Mutation(() => UserSchema)
  addUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return this.userService.addUser(addUserArgs);
  }

  @Mutation(() => UserSchema)
  registerUser(@Args('registerUserArgs') registerUserArgs: RegisterUserArgs) {
    return this.userService.registerUser(registerUserArgs);
  }

  @Mutation(() => UserSchema)
  updateUser(
    @Args({ name: 'userId', type: () => Int }) id: number,
    @Args('updateUserArgs') updateUserArgs: UpdateUserArgs,
  ) {
    return this.userService.updateUser(id, updateUserArgs);
  }
}
