import { InputType, Field, registerEnumType } from '@nestjs/graphql'
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEnum,
  Matches,
  IsArray
} from 'class-validator'
import { StatusEnum } from '../../../common/enums/status.enum'
import { RoleEnum as Role } from 'src/common/enums/users/role.enum'

registerEnumType(StatusEnum, {
  name: 'StatusEnum',
  description: 'User status'
})

registerEnumType(Role, {
  name: 'RoleEnum',
  description: 'User role'
})

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  lastname: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @IsString()
  // @Matches(/^[J, V, E]+-[0-9]$/g)
  // @MinLength(6)
  // @MaxLength(11)
  @Field(() => String)
  dni: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  @Field(() => String)
  password: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/)
  @Field(() => String)
  phone: string

  @IsNotEmpty()
  @IsEnum(Role)
  @Field(() => Role)
  roles: Role
}

@InputType()
export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Field(() => String)
  lastname: string

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  @Field(() => String)
  password: string

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  @Field(() => StatusEnum)
  status: StatusEnum
}