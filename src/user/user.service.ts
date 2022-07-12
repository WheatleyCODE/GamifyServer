import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/types/users';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create({ ...dto, role: UserRole.USER });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<User> {
    try {
      return await this.userModel.findOne({ firstName: 'Dima' });
    } catch (e) {
      console.log(e);
    }
  }
}
