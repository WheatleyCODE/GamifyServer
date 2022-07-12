import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CharacterClasses } from 'src/types/character';
import { User } from 'src/user/schemas/user.schema';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  userId: User;

  @Prop({ default: 1 })
  strength: number;

  @Prop({ default: 1 })
  intellect: number;

  @Prop({ default: 1 })
  agility: number;

  @Prop({ default: 1 })
  luck: number;

  @Prop({ default: CharacterClasses.WARRIOR })
  class: CharacterClasses;
}
export const CharacterSchema = SchemaFactory.createForClass(Character);
