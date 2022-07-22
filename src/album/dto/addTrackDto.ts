import { IsString } from 'class-validator';

export class AddTrackDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly albumId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly trackId: string;
}
