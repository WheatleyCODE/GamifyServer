import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Comment } from 'src/comment/schemas/comment.schema';
import { Post } from 'src/post/schemas/post.schema';
import { UserRole } from 'src/types/users';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  role: UserRole;

  @Prop({ default: '' })
  info: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}
export const UserSchema = SchemaFactory.createForClass(User);
