import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
import { User } from 'src/user/schemas/user.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;

  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  userId: User;

  @Prop({ required: true })
  author: string;

  @Prop()
  picture: string;

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Track' }] })
  @Prop()
  tracks: string;
}
export const AlbumSchema = SchemaFactory.createForClass(Album);
