import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql'
import { User } from './schema/user.schema'
import { UserService } from './user.service'
import { AddUserArgs } from './args/add.user.args'
import { UpdateUserArgs } from './args/update.user.args'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import * as jwt from 'jsonwebtoken'
import { JwtGuard } from 'src/auth/jwt.guard'
import { Role } from 'src/graphql'
import { RoleGuard } from 'src/auth/role.guard'

@Resolver(() => User)
export class UserResolver {
  constructor (private readonly userService: UserService) {}

  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Role.USER))
  securedResourceforUser(@Context('user') user: User){
    return 'This is Secured Resource'+ JSON.stringify(user)
  }

  @Query(() => String)
  @UseGuards(JwtGuard,  new RoleGuard(Role.ADMIN))
  securedResourceforAdmin(@Context('user') user: User){
    return 'This is Secured Resource'+ JSON.stringify(user)
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  login (
    @Args({ name: 'mobile', type: () => String }) mobile: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    let payload = {
      id: user.id,
      head_id: user.head_id,
      member_code: user.member_code,
      first_name: user.first_name,
      last_name_id: user.last_name_id,
      mobile: user.mobile,
      email: user.email_address,
      role: user.role,
    }
    return jwt.sign(payload, 'secret', { expiresIn: '1h' })
  }

  @Query(() => [User])
  getAllUsers () {
    return this.userService.getAllUsers()
  }

  @Query(() => User)
  findUserById (@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.findUserById(id)
  }

  @Query(() => User)
  findUserByMobile (
    @Args({ name: 'mobile', type: () => String }) mobile: string,
  ) {
    return this.userService.findUserByMobile(mobile)
  }

  @Mutation(() => String)
  deleteUserById (@Args({ name: 'userId', type: () => Int }) id: number) {
    return this.userService.deleteUser(id)
  }

  @Mutation(() => String)
  addUser (@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return this.userService.addUser(addUserArgs)
  }

  @Mutation(() => String)
  updateUser (@Args('updateUserArgs') updateUserArgs: UpdateUserArgs) {
    return this.userService.updateUser(updateUserArgs)
  }
}
