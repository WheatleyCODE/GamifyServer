import { IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
