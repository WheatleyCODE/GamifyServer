import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from './schemas/album.schema';
import { DeleteAlbumDto } from './dto/delete-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    try {
      return await this.albumModel.create({ ...dto });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<Album[]> {
    try {
      return await this.albumModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<Album> {
    try {
      return await this.albumModel.findOne({ title: 'Title' });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(dto: DeleteAlbumDto): Promise<Album> {
    try {
      return await this.albumModel.findByIdAndDelete(dto.id);
    } catch (e) {
      console.log(e);
    }
  }
}
