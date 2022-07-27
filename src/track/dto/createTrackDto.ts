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

  @IsString({ message: 'Должно быть строкой' })
  readonly parent: string | undefined;

  @IsString({ message: 'Должно быть строкой' })
  readonly album: string | undefined;
}
