import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Track } from 'src/track/schemas/track.schema';

export type TrackCommentDocument = TrackComment & Document;

@Schema()
export class TrackComment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Track' })
  track: Track;

  @Prop({ required: true, type: String })
  text: string;
}

export const TrackCommentSchema = SchemaFactory.createForClass(TrackComment);
