import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackService } from 'src/track/track.service';
import { CreateTrackCommentDto } from './dto/createCommentDto';
import { TrackComment, TrackCommentDocument } from './schemas/trackComment.schema';

export type CommentTypes = 'track' | 'post' | 'album';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(TrackComment.name) private readonly trackCommentModel: Model<TrackCommentDocument>,
    private readonly trackService: TrackService,
  ) {}

  async createTrackComment(options: CreateTrackCommentDto): Promise<TrackCommentDocument> {
    try {
      const { userId, trackId, text } = options;
      const track = await this.trackService.findTrackBy({ _id: trackId });
      const comment = await this.trackCommentModel.create({ user: userId, track: trackId, text });
      track.comments.push(comment._id);
      await track.save();
      return comment;
    } catch (e) {
      console.log(e);
      throw new HttpException('Ошибка при создании коментария для трека', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
