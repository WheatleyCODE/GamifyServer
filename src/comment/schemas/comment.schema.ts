import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  userId: User;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  text: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
