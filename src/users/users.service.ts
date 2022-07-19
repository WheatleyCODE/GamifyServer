import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserOptions } from 'src/types/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(options: CreateUserOptions): Promise<UserDocument> {
    try {
      return await this.userModel.create({
        ...options,
      });
    } catch (e) {
      throw new HttpException('Ошибка при создании пользователя', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find();
    } catch (e) {
      throw new HttpException('Ошибка при нахождении пользователей', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserBy(options: { [key: string]: any }): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({ ...options });
    } catch (e) {
      throw new HttpException('Ошибка при нахождении пользователя', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
