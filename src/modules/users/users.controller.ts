import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/users.input'
import { RoleEnum } from 'src/common/enums/users/role.enum'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../auth/role.decorator'

@Controller('users')
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.ADMIN)
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @Post()
  async create(@Body() user: CreateUserInput) {
    return await this.usersService.create(user)
  }
}