import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { Constants } from 'src/config/Constants'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Constants.jwt,
      signOptions: { expiresIn: '250d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}