import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Folder } from 'src/folder/schemas/folder.schema';
import { User } from 'src/users/schemas/user.schema';

export type StorageDocument = Storage & Document;

@Schema()
export class Storage {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: 1024 ** 3 * 10, type: Number })
  diskSpace: number;

  @Prop({ default: 0, type: Number })
  usedSpace: number;

  @Prop({ type: [Types.ObjectId], ref: 'Folder' })
  folders: string[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
