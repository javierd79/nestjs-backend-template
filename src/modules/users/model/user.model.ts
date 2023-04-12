import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  Directive,
  Field,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { Document, Types as MongooseTypes } from 'mongoose'
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar'
import { StatusEnum as Status } from 'src/common/enums/status.enum'
import { RoleEnum as Role } from 'src/common/enums/users/role.enum'
import { Avatar } from 'src/modules/avatar/model/avatar.model'

const bcrypt = require('bcrypt');

registerEnumType(Status, {
  name: 'StatusEnum',
  description: 'User status'
})

registerEnumType(Role, {
  name: 'RoleEnum',
  description: 'User role'
})

@ObjectType()
@Schema({
  timestamps: true,
})

export class User {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId;

  @Directive('@capitalizeDirective')
  @Field(() => String)
  @Prop({
    min: 2,
    max: 20,
    required: true
  })
  name: string;

  @Directive('@capitalizeDirective')
  @Field(() => String)
  @Prop({
    min: 2,
    max: 20,
    required: true
  })
  lastname: string;

  @Field(() => String)
  @Prop({
    unique: true,
    // match: /^[J, V, E, G]+-[0-9]$/g,
    required: true,
    min: 6,
    max: 11
  })
  dni: string;

  @Field(() => String)
  @Prop({
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    required: true
  })
  email: string;
  
  @Field(() => String)
  @Prop({
    match: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    required: true
  })
  phone: string;

  @Field(() => String)
  @Prop({
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    required: true
  })
  @Exclude()
  password: string;

  @Field(() => Status)
  @Prop({ 
    index: true, 
    default: Status.ACTIVE 
  })
  status: Status;

  @Field(() => Role)
  @Prop({
    index: true,
    required: true
  })
  roles: Role;

  @Field(() => Avatar)
  @Prop({
    type: MongooseTypes.ObjectId,
    ref: 'Avatar'
  })
  avatar: Avatar;
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
  const doc = this as UserDocument
  if (doc.isNew) {
    doc.password = await bcrypt.hash(doc.password, 10)
    doc.email = doc.email.toLowerCase()
  }
  next()
})