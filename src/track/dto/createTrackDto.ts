import { IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly author: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly text: string;

  readonly parentId: string | undefined;
  readonly albumId: string | undefined;
}
