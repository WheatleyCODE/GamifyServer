import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ItemTypes } from 'src/types/storage';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop({ default: ItemTypes.FOLDER, type: String })
  type: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Folder' })
  parent: Types.ObjectId;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
