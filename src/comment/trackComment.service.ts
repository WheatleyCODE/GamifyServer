import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { TrackService } from 'src/track/track.service';
import { createTrackCommentOptions } from 'src/types/comments';
import { CreateTrackCommentDto } from './dto/createTrackCommentDto';
import { TrackComment, TrackCommentDocument } from './schemas/trackComment.schema';

@Injectable()
export class TrackCommentService extends MongoService {
  constructor(
    @InjectModel(TrackComment.name) private readonly trackCommentModel: Model<TrackCommentDocument>,
    private readonly trackService: TrackService,
  ) {
    super(trackCommentModel);
  }

  async createTrackComment(options: CreateTrackCommentDto): Promise<TrackCommentDocument> {
    try {
      const { userId, trackId, text } = options;
      const track = await this.trackService.getOneTrack(trackId);

      const trackComment = await this.createOne<TrackCommentDocument, createTrackCommentOptions>({
        user: userId,
        track: trackId,
        text,
      });

      track.comments.push(trackComment._id);
      await track.save();
      return trackComment;
    } catch (e) {
      throw e;
    }
  }
}
