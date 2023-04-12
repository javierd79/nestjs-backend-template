import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { User, UserSchema } from './model/user.model'
import { ObjectIdScalar } from '../../common/scalars/object-id.scalar'
import { UsersControllers } from './users.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [
    UsersResolver, 
    UsersService, 
    ObjectIdScalar
  ],
  controllers: [UsersControllers],
  exports: [UsersService]
})

export class UsersModule {}
