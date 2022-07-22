import { IsString } from 'class-validator';

export class CreateAlbumCommentDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly albumId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;
}
