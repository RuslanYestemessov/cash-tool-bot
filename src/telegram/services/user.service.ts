import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(userName: string): Promise<UserDocument> {
    return this.userModel.findOne({ userName }).exec();
  }

  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }
}
