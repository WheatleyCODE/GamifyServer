import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  name: string;

  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  userId: User;

  @Prop({ required: true })
  author: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  audio: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}
export const TrackSchema = SchemaFactory.createForClass(Track);
