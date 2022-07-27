import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrackCommentDocument = TrackComment & Document;

@Schema()
export class TrackComment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Track' })
  track: Types.ObjectId;

  @Prop({ required: true, type: String })
  text: string;
}

export const TrackCommentSchema = SchemaFactory.createForClass(TrackComment);
