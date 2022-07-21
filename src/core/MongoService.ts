import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

export abstract class MongoService {
  constructor(private readonly model: Model<any>) {}

  protected async createOne<T, O>(options: O): Promise<T> {
    try {
      return await this.model.create({ ...options });
    } catch (e) {
      throw new HttpException(`Ошибка при создании ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async updateOneById<T, O>(id: string, options: O): Promise<T> {
    try {
      return await this.model.findByIdAndUpdate(id, options);
    } catch (e) {
      throw new HttpException(`Ошибка при обновлении ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async findAll<T>(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (e) {
      throw new HttpException(`Ошибка при поиске всех ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async findOneBy<T>(options: { [key: string]: any }): Promise<T> {
    try {
      return await this.model.findOne({ ...options });
    } catch (e) {
      throw new HttpException(`Ошибка при поиске ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async findAllBy<T>(options: { [key: string]: any }): Promise<T[]> {
    try {
      return await this.model.find({ ...options });
    } catch (e) {
      throw new HttpException(`Ошибка при поиске ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async findOneById<T>(id: string): Promise<T> {
    try {
      return await this.model.findById(id);
    } catch (e) {
      throw new HttpException(`Ошибка при поиске ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async findAllByIds<T>(ids: string[]): Promise<T[]> {
    try {
      return await this.model.find({ _id: { $in: ids } });
    } catch (e) {
      throw new HttpException(`Ошибка при поиске ${this.model.modelName} по ids`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected async deleteOneById<T>(id: string): Promise<T> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (e) {
      throw new HttpException(`Ошибка при удалении ${this.model.modelName}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
