import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Types as MongooseTypes } from 'mongoose'
import { NotFoundException } from '@nestjs/common'
import {
  CreateUserInput,
} from './dto/users.input'
import { User } from './model/user.model'
import { UsersService } from './users.service'
import { ObjectIdScalar } from '../../common/scalars/object-id.scalar'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Queries
  
  // @Query(() => [User])
  // async users(): Promise<User[]> {
  //   return this.usersService.findAll()
  // }

  // @Query(() => User)
  // async User(
  //   @Args({ name: '_id', type: () => ObjectIdScalar })
  //   _id: MongooseTypes.ObjectId
  // ): Promise<User> {
  //   return await this.usersService.findOne(_id);
  // }

  // // Mutations

  // @Mutation(() => User)
  // async createUser(
  //   @Args({ name: 'input', type: () => CreateUserInput })
  //   input: CreateUserInput
  // ) {
  //   return await this.usersService.create(input)
  // }

  // @Mutation(() => User, { name: 'updateUser' })
  // async updateUser(
  //   @Args({ name: '_id', type: () => ObjectIdScalar })
  //   _id: MongooseTypes.ObjectId,
  //   @Args({ name: 'input', type: () => UpdateUserInput })
  //   input: UpdateUserInput
  // ) {
  //   return await this.usersService.update(_id, input);
  // }

  // @Mutation(() => User, { name: 'deleteUser' })
  // async deleteUser(
  //   @Args({ name: '_id', type: () => ObjectIdScalar })
  //   _id: MongooseTypes.ObjectId
  // ) {
  //   return await this.usersService.delete(_id);
  // }
}