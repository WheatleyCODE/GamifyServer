import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { TrackComment } from 'src/comment/schemas/trackComment.schema';
import { User } from 'src/users/schemas/user.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ default: 0, type: Number })
  listen: number;

  @Prop({ type: String })
  text: string;

  @Prop({ type: String })
  image: string;

  @Prop({ required: true, type: String })
  audio: string;

  @Prop({ type: Types.ObjectId, ref: 'Album' })
  album: Album;

  @Prop({ type: [Types.ObjectId], ref: 'TrackComment' })
  comments: TrackComment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
