import { IsString } from 'class-validator';

export class CreateFolderAccessLink {
  @IsString({ message: 'Должно быть строкой' })
  readonly folderId: string;
}
