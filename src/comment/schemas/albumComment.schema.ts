import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlbumCommentDocument = AlbumComment & Document;

@Schema()
export class AlbumComment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Album' })
  album: Types.ObjectId;

  @Prop({ required: true, type: String })
  text: string;
}

export const AlbumCommentSchema = SchemaFactory.createForClass(AlbumComment);
