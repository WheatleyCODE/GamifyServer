import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ItemTypes } from 'src/types/storage';
import { User } from 'src/users/schemas/user.schema';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop({ default: ItemTypes.FOLDER, type: String })
  type: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Folder' })
  parent: Folder;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
