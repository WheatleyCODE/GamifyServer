import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { Storage, StorageDocument } from './schemas/storage.schema';

@Injectable()
export class StorageService extends MongoService {
  constructor(@InjectModel(Storage.name) private readonly storageModel: Model<StorageDocument>) {
    super(storageModel);
  }

  async createStorage(user: string): Promise<StorageDocument> {
    try {
      const storage = await this.findOneBy<StorageDocument>({ user });

      if (storage) {
        throw new HttpException('Хранилище уже существует', HttpStatus.CONFLICT);
      }

      return await this.createOne<StorageDocument, { user: string }>({ user });
    } catch (e) {
      throw e;
    }
  }

  async getStorageByUserId(user: string, populate = false): Promise<StorageDocument> {
    try {
      const storage = await this.findOneBy<StorageDocument>({ user: new Types.ObjectId(user) });

      if (!storage) {
        throw new HttpException('Хранилище не найдено', HttpStatus.BAD_REQUEST);
      }

      if (populate) {
        await storage.populate('items');
        return storage;
      }

      return storage;
    } catch (e) {
      throw e;
    }
  }

  async getOneStorage(id: string): Promise<StorageDocument> {
    try {
      const storage = await this.findOneById<StorageDocument>(id);

      if (!storage) {
        throw new HttpException('Хранилище не найдено', HttpStatus.BAD_REQUEST);
      }

      await storage.populate('folders');
      await storage.populate('tracks');
      await storage.populate('albums');

      return storage;
    } catch (e) {
      throw e;
    }
  }
}
