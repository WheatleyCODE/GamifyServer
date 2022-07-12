import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  userId: User;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  text: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
