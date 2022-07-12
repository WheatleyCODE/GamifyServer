import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { DeleteTrackDto } from './dto/delete-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    try {
      return await this.trackModel.create({ ...dto });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<Track[]> {
    try {
      return await this.trackModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<Track> {
    try {
      return await this.trackModel.findOne({ title: 'Title' });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(dto: DeleteTrackDto): Promise<Track> {
    try {
      return await this.trackModel.findByIdAndDelete(dto.id);
    } catch (e) {
      console.log(e);
    }
  }
}
