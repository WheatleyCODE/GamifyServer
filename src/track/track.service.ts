import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { createTrackOptions } from 'src/types/tracks';
import { checkAndThrowErr } from 'src/utils/checkAndThrowErr';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService extends MongoService {
  // Todo Повторение запросов как и в юзере можено вынести выше
  // Todo В схеме пользователя и в схеме трека написаны поля типа стринг но они могут быть Null

  constructor(@InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>) {
    super(trackModel);
  }

  async createTrack(options: CreateTrackDto): Promise<TrackDocument> {
    try {
      const { name, author, userId, text } = options;
      const track = await this.findOneBy<TrackDocument>({ name });

      if (track) {
        throw new HttpException('Трек с таким названием уже существует', HttpStatus.CONFLICT);
      }

      const newTrack = this.createOne<TrackDocument, createTrackOptions>({
        user: userId,
        name,
        author,
        text,
        image: 'Картинки нет',
        audio: 'Аудио тоже нет',
      });

      return newTrack;
    } catch (e) {
      throw e;
    }
  }

  async getAllTracks(): Promise<TrackDocument[]> {
    try {
      return await this.findAll<TrackDocument>();
    } catch (e) {
      throw e;
    }
  }

  async getOneTrack(id: string): Promise<TrackDocument> {
    try {
      const track = await this.findOneById<TrackDocument>(id);
      checkAndThrowErr(track, 'Трек');
      return track;
    } catch (e) {
      throw e;
    }
  }

  async getAllTrackByIds(ids: string[]): Promise<TrackDocument[]> {
    try {
      const tracks = await this.findAllByIds<TrackDocument>(ids);
      checkAndThrowErr(tracks, 'Треки');
      return tracks;
    } catch (e) {
      throw e;
    }
  }

  async deleteOneTrack(id: string): Promise<TrackDocument> {
    try {
      const track = await this.deleteOneById<TrackDocument>(id);
      checkAndThrowErr(track, 'Трек');
      return track;
    } catch (e) {
      throw e;
    }
  }

  async updateOneTrack(id: string, options: CreateTrackDto): Promise<TrackDocument> {
    try {
      const { name, author, userId, text } = options;
      const track = await this.updateOneById<TrackDocument, createTrackOptions>(id, {
        user: userId,
        name,
        author,
        text,
        image: 'Картинки нет',
        audio: 'Аудио тоже нет',
      });

      checkAndThrowErr(track, 'Трек');

      return track;
    } catch (e) {
      throw e;
    }
  }
}
