import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  // Todo Повторение запросов как и в юзере можено вынести выше
  // Todo В схеме пользователя и в схеме трека написаны поля типа стринг но они могут быть Null

  constructor(@InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>) {}

  async create(options: CreateTrackDto): Promise<TrackDocument> {
    try {
      const { name, author, userId, text } = options;

      return await this.trackModel.create({
        name,
        author,
        text,
        user: userId,
        audio: 'Нужно будет создать ссылку на трек',
      });
    } catch (e) {
      throw new HttpException('Ошибка при создании трека', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll(): Promise<TrackDocument[]> {
    try {
      return await this.trackModel.find();
    } catch (e) {
      throw new HttpException('Ошибка при нахождении треков', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTrackBy(options: { [key: string]: any }): Promise<TrackDocument> {
    try {
      return await this.trackModel.findOne({ ...options });
    } catch (e) {
      throw new HttpException('Ошибка при нахождении трека', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(id: string): Promise<TrackDocument> {
    try {
      return await this.trackModel.findByIdAndDelete(id);
    } catch (e) {
      throw new HttpException('Ошибка при удалении трека', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOne(id: string, options: CreateTrackDto): Promise<TrackDocument> {
    try {
      return await this.trackModel.findByIdAndUpdate(id, options);
    } catch (e) {
      throw new HttpException('Ошибка при обновлении трека', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
