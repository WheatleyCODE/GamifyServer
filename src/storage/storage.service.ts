import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
