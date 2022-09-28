import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserOptions } from 'src/types/user';
import { Service } from 'src/core/Service';

@Injectable()
export class UserService extends Service<UserDocument, CreateUserOptions> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(options: CreateUserOptions): Promise<UserDocument> {
    try {
      return await this.createOne(options);
    } catch (e) {
      throw e;
    }
  }
}
