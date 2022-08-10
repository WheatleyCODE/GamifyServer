import { IsString } from 'class-validator';
import { AccessType } from 'src/types/storage';

export class ChangeFolderAccessType {
  @IsString({ message: 'Должно быть строкой' })
  readonly folderId: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly accessType: AccessType;
}
