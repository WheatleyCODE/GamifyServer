import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { User } from 'src/users/schemas/user.schema';

export type AlbumCommentDocument = AlbumComment & Document;

@Schema()
export class AlbumComment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Album' })
  album: Album;

  @Prop({ required: true, type: String })
  text: string;
}

export const AlbumCommentSchema = SchemaFactory.createForClass(AlbumComment);
