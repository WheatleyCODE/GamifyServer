import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AlbumComment } from 'src/comment/schemas/albumComment.schema';
import { Track } from 'src/track/schemas/track.schema';
import { User } from 'src/users/schemas/user.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [Types.ObjectId], ref: 'Track' })
  tracks: Track[];

  @Prop({ type: [Types.ObjectId], ref: 'AlbumComment' })
  comments: AlbumComment[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
