import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { FilesService, FileType } from 'src/files/files.service';
import { createTrackOptions } from 'src/types/tracks';
import { checkAndThrowErr } from 'src/utils/checkAndThrowErr';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService extends MongoService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>,
    private readonly filesService: FilesService,
  ) {
    super(trackModel);
  }

  async createTrack(
    options: CreateTrackDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<TrackDocument> {
    try {
      const { name, author, userId, text } = options;
      const track = await this.findOneBy<TrackDocument>({ name });

      if (track) {
        throw new HttpException('Трек с таким названием уже существует', HttpStatus.CONFLICT);
      }

      const pathImage = await this.filesService.createFile(FileType.IMAGE, image);
      const pathAudio = await this.filesService.createFile(FileType.AUDIO, audio);

      const newTrack = this.createOne<TrackDocument, createTrackOptions>({
        user: userId,
        name,
        author,
        text,
        image: pathImage,
        audio: pathAudio,
      });

      return newTrack;
    } catch (e) {
      throw e;
    }
  }

  async getAllTracks(count = 10, offset = 0): Promise<TrackDocument[]> {
    try {
      return await this.findAll<TrackDocument>({ count, offset });
    } catch (e) {
      throw e;
    }
  }

  async getOneTrack(id: string): Promise<TrackDocument> {
    try {
      const track = await this.findOneById<TrackDocument>(id);
      checkAndThrowErr(track, 'Трек');
      await track.populate('comments');
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

  async listen(id: string): Promise<void> {
    try {
      const track = await this.trackModel.findById(id);
      track.listen += 1;
      await track.save();
    } catch (e) {
      throw new HttpException('Ошибка при прослушивании трека', HttpStatus.BAD_REQUEST);
    }
  }

  async search(query: string): Promise<TrackDocument[]> {
    try {
      return await this.trackModel.find({
        name: { $regex: new RegExp(query, 'i') },
      });
    } catch (e) {
      throw new HttpException('Ошибка при поиске треков', HttpStatus.BAD_REQUEST);
    }
  }
}
