import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
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
    UsersService, 
    ObjectIdScalar
  ],
  controllers: [UsersControllers],
  exports: [UsersService]
})

export class UsersModule {}
