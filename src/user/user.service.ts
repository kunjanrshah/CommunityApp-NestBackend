import { Injectable } from '@nestjs/common'
import { UserEntity } from './entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AddUserArgs } from './args/add.user.args'
import { UpdateUserArgs } from './args/update.user.args'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async login (mobile: string, password: string):Promise<UserEntity> {
    let user = await this.userRepo.findOne({
      where: { mobile: mobile},
    })
    return user
  }

  async getAllUsers (): Promise<UserEntity[]> {
    let users = await this.userRepo.find()
    return users
  }

  async findUserById (id: number): Promise<UserEntity> {
    let user = await this.userRepo.findOne({ where: { id: id } })
    return user
  }

  async findUserByMobile (mobile: string): Promise<UserEntity> {
    let user = await this.userRepo.findOne({ where: { mobile: mobile } })
    return user
  }

  async deleteUser (id: number): Promise<string> {
    await this.userRepo.delete(id)
    return 'User Deleted'
  }

  async addUser (addUserArgs: AddUserArgs): Promise<string> {
    const user = new UserEntity()
    user.head_id = addUserArgs.head_id
    user.role = addUserArgs.role
    user.member_code = addUserArgs.member_code
    user.email_address = addUserArgs.email_address
    user.mobile = addUserArgs.mobile
    user.plain_password = addUserArgs.plain_password
    user.password = addUserArgs.password
    user.relationship_id = addUserArgs.relationship_id
    user.sub_community_id = addUserArgs.sub_community_id
    user.local_community_id = addUserArgs.local_community_id
    user.first_name = addUserArgs.first_name
    user.last_name_id = addUserArgs.last_name_id
    user.father_name = addUserArgs.father_name
    user.mother_name = addUserArgs.mother_name
    user.status = addUserArgs.status
    user.gender = addUserArgs.gender
    await this.userRepo.save(user)

    return 'User Added'
  }

  async updateUser (updateUserArgs: UpdateUserArgs): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { id: updateUserArgs.id },
    })
    user.head_id = updateUserArgs.head_id
    user.role = updateUserArgs.role
    user.member_code = updateUserArgs.member_code
    user.email_address = updateUserArgs.email_address
    user.mobile = updateUserArgs.mobile
    user.plain_password = updateUserArgs.plain_password
    user.password = updateUserArgs.password
    user.relationship_id = updateUserArgs.relationship_id
    user.sub_community_id = updateUserArgs.sub_community_id
    user.local_community_id = updateUserArgs.local_community_id
    user.first_name = updateUserArgs.first_name
    user.last_name_id = updateUserArgs.last_name_id
    user.father_name = updateUserArgs.father_name
    user.mother_name = updateUserArgs.mother_name
    user.status = updateUserArgs.status
    user.gender = updateUserArgs.gender
    await this.userRepo.save(user)
    return 'User Updated'
  }
}
