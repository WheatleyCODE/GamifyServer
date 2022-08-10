import { IsString } from 'class-validator';

export class RenameFolderDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly folderId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
