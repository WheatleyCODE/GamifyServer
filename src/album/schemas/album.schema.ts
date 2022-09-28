import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AlbumComment } from 'src/comment/schemas/albumComment.schema';
import { Folder } from 'src/folder/schemas/folder.schema';
import { Track } from 'src/track/schemas/track.schema';
import { AccessType, ItemTypes } from 'src/types/storage';
import { User } from 'src/user/schemas/user.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ default: ItemTypes.ALBUM, type: String })
  type: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [Types.ObjectId], ref: 'Track' })
  tracks: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'AlbumComment' })
  comments: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Folder' })
  parent: Types.ObjectId;

  @Prop({ type: String })
  accesLink: string;

  @Prop({ default: AccessType.PRIVATE, type: String })
  accessType: AccessType;

  @Prop({ default: Date.now(), type: Number })
  creationDate: number;

  @Prop({ default: Date.now(), type: Number })
  openDate: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
