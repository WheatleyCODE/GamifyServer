import { IsString } from 'class-validator';
import { ItemTypes } from 'src/types/storage';

export class DeleteOneItemDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly id: string;

  @IsString({ message: 'Должно быть строкой' })
  readonly type: ItemTypes;
}
