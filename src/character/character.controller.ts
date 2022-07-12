import { Controller, Get, Post } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  createCharacter() {
    return this.characterService.create();
  }

  @Get()
  getAllCharacters() {
    return this.characterService.getAll();
  }

  @Get('/:id')
  getOneCharacter() {
    return this.characterService.getOne();
  }
}
