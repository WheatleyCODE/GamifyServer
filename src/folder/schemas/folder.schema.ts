import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AccessType, ItemTypes } from 'src/types/storage';

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

  @Prop({ type: String })
  accesLink: string;

  @Prop({ default: AccessType.PRIVATE, type: String })
  accessType: AccessType;

  @Prop({ default: Date.now(), type: Number })
  creationDate: number;

  @Prop({ default: Date.now(), type: Number })
  openDate: number;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
