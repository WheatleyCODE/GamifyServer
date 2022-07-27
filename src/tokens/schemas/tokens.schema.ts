import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TokensDocument = Tokens & Document;

@Schema()
export class Tokens {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: String, required: true })
  accessToken: string;

  @Prop({ type: String, required: true })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(Tokens);
