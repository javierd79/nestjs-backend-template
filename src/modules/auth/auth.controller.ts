import { Controller, Post, Body, HttpException, Req, HttpStatus, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { RoleEnum } from 'src/common/enums/users/role.enum'
import { Roles } from './role.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body) {
    try {
      console.log(body)
      const result = await this.authService.signIn(body.email, body.password)
      return result
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.ADMIN)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = req.user
    return { profile: user }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req) {
    req.logout()
    return { message: 'Successfully logged out' }
  }
}