import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarsController } from './avatar.controller';
import { AvatarsService } from './avatar.service';
import { AvatarSchema } from './model/avatar.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: 'Avatar', schema: AvatarSchema 
    }]),
  ],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AvatarsModule {}
