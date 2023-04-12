import { 
  Prop,
  SchemaFactory
} from '@nestjs/mongoose'
import { 
  Field
} from '@nestjs/graphql'
import {
  Document,
  Types as MongooseTypes
} from 'mongoose'
import { ObjectIdScalar } from 'src/common/scalars/object-id.scalar'

export class Avatar {
  @Field(() => ObjectIdScalar)
  _id: MongooseTypes.ObjectId

  @Field(() => String)
  originalname: string

  @Field(() => String)
  encoding: string

  @Field(() => String)
  mimeType: string

  @Field(() => String)
  destination: string

  @Field(() => String)
  filename: string

  @Field(() => String)
  path: string

  @Field(() => Number)
  size: number
}

export type AvatarDocument = Avatar & Document
export const AvatarSchema = SchemaFactory.createForClass(Avatar)