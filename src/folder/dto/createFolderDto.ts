import { IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly storageId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  // @IsString({ message: 'Должно быть строкой' })
  readonly parentId: string | undefined;
}
