import { Module, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Connector } from 'src/config/Connector'

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      Connector
    )
  ],
  providers: [],
  exports: [MongooseModule]
})
export class DatabaseModule {}
