import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректная почта' })
  readonly email: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 12, { message: 'Не меньше 8 и не больше 12' })
  readonly password: string;
}
