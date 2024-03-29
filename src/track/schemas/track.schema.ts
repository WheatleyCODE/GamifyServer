import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { TrackComment } from 'src/comment/schemas/trackComment.schema';
import { Folder } from 'src/folder/schemas/folder.schema';
import { AccessType, ItemTypes } from 'src/types/storage';
import { User } from 'src/user/schemas/user.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ default: ItemTypes.TRACK, type: String })
  type: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

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
  album: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'TrackComment' })
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

export const TrackSchema = SchemaFactory.createForClass(Track);
