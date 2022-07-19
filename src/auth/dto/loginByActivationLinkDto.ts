import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class loginByActivationLinkDto {
  @ApiProperty({ example: 'bf89d260-e5...', description: 'Cсылка для активации аккаунта' })
  @IsString({ message: 'Должно быть строкой' })
  activationLink: string;
}
