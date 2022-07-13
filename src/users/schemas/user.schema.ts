import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/types/users';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  nickName: string;

  @Prop({ default: [UserRole.USER], type: [String] })
  roles: UserRole[];

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ default: false, type: Boolean })
  isActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
