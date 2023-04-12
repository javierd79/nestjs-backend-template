import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose'
import { User, UserDocument } from './model/user.model'
import {
  UpdateUserInput,
  CreateUserInput
} from './dto/users.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findAll() {
    try {
      return await this.userModel.find({}).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async create(data: CreateUserInput) {
    try {
      const newUser = new this.userModel(data);
      return await newUser.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(_id: MongooseTypes.ObjectId, input: UpdateUserInput) {
    const user = await this.findOne(_id);
    if (!user) throw new NotFoundException(`User #${_id} not found`);

    return await this.userModel
      .findByIdAndUpdate(_id, { $set: input }, { new: true })
      .sort({ name: 1 })
      .exec();
  }

  async delete(_id: MongooseTypes.ObjectId) {
    const user = await this.findOne(_id);
    if (!user) throw new NotFoundException(`User #${_id} not found`);

    return await this.userModel.findByIdAndDelete(_id);
  }

  async findOne(_id: MongooseTypes.ObjectId) {
    try {
      return await this.userModel
        .findOne({
          _id
        })
        .exec();
    } catch (error) {
      throw new NotFoundException(`User #${_id} not found`);
    }
  }

  async find(by: string, value: any) {
    let jsonData = {} 
    jsonData[by] = value
    try {
      return await this.userModel.find(jsonData).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOneByEmail(email: string): Promise<any | undefined> {
    try {
      return await this.userModel
      .findOne({ email })
      .exec();
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async filterUsers(object: Object) {
    try {
      return await this.userModel
        .find(object)
        .exec();
    } catch (error) {
      throw new NotFoundException(`User(s) not found`);
    }
  }
}
