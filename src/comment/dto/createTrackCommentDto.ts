import { IsString } from 'class-validator';

export class CreateTrackCommentDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly trackId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;
}
