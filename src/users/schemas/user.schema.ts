import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/types/users';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  nickName: string;

  @Prop({ default: [UserRoles.USER], type: [String] })
  roles: UserRoles[];

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ default: false, type: Boolean })
  isActivated: boolean;

  @Prop({ type: String })
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
