import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StorageDocument = Storage & Document;

@Schema()
export class Storage {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ default: 1024 ** 3 * 10, type: Number })
  diskSpace: number;

  @Prop({ default: 0, type: Number })
  usedSpace: number;

  @Prop({ type: [Types.ObjectId], ref: 'Folder' })
  folders: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Track' })
  tracks: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Album' })
  albums: Types.ObjectId[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
