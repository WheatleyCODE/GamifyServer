import { IsArray, IsString } from 'class-validator';

export class ReplaceTracksDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly albumId: string;

  @IsArray({ message: 'Должно быть массивом строк' })
  readonly trackIds: string[];
}
