import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar } from './dto/avatar.interface';

@Injectable()
export class AvatarsService {
  constructor(@InjectModel('Avatar') private readonly avatarModel: Model<Avatar>) {}

  async getAll() {
    const avatars = this.avatarModel.find({}).exec();
    return await avatars;
  }

  async create(file: Express.Multer.File): Promise<Avatar> {
    const createdAvatar = new this.avatarModel({
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size,
    });
    return createdAvatar.save();
  }
}