import { IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly author: string;
}
