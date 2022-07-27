import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { CreateAlbumOptions } from 'src/types/albums';
import { checkAndThrowErr } from 'src/utils/checkAndThrowErr';
import { ReplaceTracksDto } from './dto/replaceTracksDto';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { AddTrackDto } from './dto/AddTrackDto';
import { TrackService } from 'src/track/track.service';
import { FilesService, FileType } from 'src/files/files.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class AlbumService extends MongoService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>,
    private readonly trackService: TrackService,
    private readonly filesService: FilesService,
    private readonly storageService: StorageService,
  ) {
    super(albumModel);
  }

  async createAlbum(options: CreateAlbumDto, image: Express.Multer.File): Promise<AlbumDocument> {
    try {
      const { name, author, userId, parentId } = options;

      const pathImage = await this.filesService.createFile(FileType.IMAGE, image);

      const newAlbum = await this.createOne<AlbumDocument, CreateAlbumOptions>({
        user: new Types.ObjectId(userId),
        name,
        author,
        image: pathImage,
        parent: parentId ? new Types.ObjectId(parentId) : undefined,
      });

      if (!parentId) {
        const storage = await this.storageService.getStorageByUserId(userId);
        storage.albums.push(newAlbum._id);
        await storage.save();
      }

      return newAlbum;
    } catch (e) {
      throw e;
    }
  }

  async getAllAlbums(): Promise<AlbumDocument[]> {
    try {
      return await this.findAll<AlbumDocument>();
    } catch (e) {
      throw e;
    }
  }

  async getOneAlbum(id: string): Promise<AlbumDocument> {
    try {
      const album = await this.findOneById<AlbumDocument>(id);
      checkAndThrowErr(album, 'Альбом');
      await album.populate('comments');
      await album.populate('tracks');
      return album;
    } catch (e) {
      throw e;
    }
  }

  async deleteOneAlbum(id: string): Promise<AlbumDocument> {
    try {
      const album = await this.deleteOneById<AlbumDocument>(id);
      checkAndThrowErr(album, 'Альбом');
      return album;
    } catch (e) {
      throw e;
    }
  }

  async updateOneAlbum(id: string, options: CreateAlbumDto): Promise<AlbumDocument> {
    try {
      const { name, author, userId } = options;

      const album = await this.updateOneById<AlbumDocument, CreateAlbumOptions>(id, {
        user: new Types.ObjectId(userId),
        name,
        author,
        image: 'Картинки нет',
      });

      checkAndThrowErr(album, 'Альбом');

      return album;
    } catch (e) {
      throw e;
    }
  }

  async replaceTracks(options: ReplaceTracksDto): Promise<AlbumDocument> {
    try {
      const { albumId, trackIds } = options;
      const album = await this.getOneAlbum(albumId);
      const tracks = await this.trackService.getAllTrackByIds(trackIds);

      tracks.forEach((track) => {
        track.album = album._id;
        track.save();
      });

      album.tracks = [...trackIds] as any[];
      await album.save();

      return album;
    } catch (e) {
      throw e;
    }
  }

  async addTrack(options: AddTrackDto): Promise<any> {
    try {
      const { albumId, trackId } = options;
      const album = await this.findOneById<AlbumDocument>(albumId);
      const track = await this.trackService.getOneTrack(trackId);

      checkAndThrowErr(album, 'Альбом');
      checkAndThrowErr(track, 'Трек');

      track.album = album._id;
      album.tracks.push(track._id);

      await track.save();
      await album.save();

      return album;
    } catch (e) {
      throw e;
    }
  }
}
