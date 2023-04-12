import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { DatabaseModule } from './common/modules/database/database.module'
import { GraphQLModule } from './common/modules/graphql/graphql.module';
import { BullModule } from '@nestjs/bull'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AvatarsModule } from './modules/avatar/avatar.module'
// import { AuthService } from './modules/auth/auth.service'
import { AuthModule } from './modules/auth/auth.module'
import * as AutoIncrement from 'mongoose-auto-increment';
// import { MetadataScanner } from '@nestjs/core/metadata-scanner';
// import { SocketModule } from './modules/socket/socket.module'
// import * as moment from 'moment'
// import { UsersService } from './modules/users/users.service'
// import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({}),
    BullModule.registerQueue({
      name: 'queue',
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    MulterModule.register({
      dest: './avatars',
    }),
    AvatarsModule,
    AuthModule,
    GraphQLModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})
export class AppModule {}
