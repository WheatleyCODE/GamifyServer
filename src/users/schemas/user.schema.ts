/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Storage } from 'src/storage/schemas/storage.schema';
import { UserRoles } from 'src/types/users';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'Дмитрий', description: 'Имя пользователя' })
  @Prop({ type: String })
  firstName: string;

  @ApiProperty({ example: 'Бажаев', description: 'Фамилия пользователя' })
  @Prop({ type: String })
  lastName: string;

  @ApiProperty({ example: 'QB_Wheatley', description: 'Ник пользователя' })
  @Prop({ required: true, type: String })
  nickName: string;

  @ApiProperty({ example: [ 'USER', 'ADMIN' ], description: 'Роли пользователя' })
  @Prop({ default: [UserRoles.USER], type: [String] })
  roles: UserRoles[];

  @ApiProperty({ example: 'qb.wheatley@gmail.com', description: 'Email пользователя' })
  @Prop({ required: true, type: String })
  email: string;

  @ApiProperty({ description: 'Захешированный пароль пользователя' })
  @Prop({ required: true, type: String })
  password: string;

  @ApiProperty({ example: false, description: 'Флаг активации аккаунта' })
  @Prop({ default: false, type: Boolean })
  isActivated: boolean;

  @ApiProperty({ description: 'Ссылка для активации акаунта' })
  @Prop({ type: String })
  activationLink: string;

  @ApiProperty({ description: 'Cсылка для сброса пароля' })
  @Prop({ type: String })
  resetPasswordLink: string;

  @Prop({ type: Types.ObjectId, ref: 'Storage' })
  storage: Storage;
}

export const UserSchema = SchemaFactory.createForClass(User);
