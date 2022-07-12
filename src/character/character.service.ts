import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async create(): Promise<Character> {
    try {
      return await this.characterModel.create({});
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<Character[]> {
    try {
      return await this.characterModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<Character> {
    try {
      return await this.characterModel.findOne({ agility: 1 });
    } catch (e) {
      console.log(e);
    }
  }
}
