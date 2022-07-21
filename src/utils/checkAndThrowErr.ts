import { HttpException, HttpStatus } from '@nestjs/common';

export const checkAndThrowErr = (any: any, anyName: string) => {
  if (!any) throw new HttpException(`${anyName} не найден`, HttpStatus.BAD_REQUEST);

  if (Array.isArray(any) && any.length === 0) {
    throw new HttpException(`${anyName} не найдены`, HttpStatus.BAD_REQUEST);
  }
};
