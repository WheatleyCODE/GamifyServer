import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserOptions } from 'src/types/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(options: CreateUserOptions): Promise<UserDocument> {
    try {
      const hashPassword = await bcrypt.hash(options.password, 6);

      return await this.userModel.create({
        ...options,
        password: hashPassword,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async findUserBy(options: { [key: string]: any }): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({ ...options });
    } catch (e) {
      console.log(e);
    }
  }
}
