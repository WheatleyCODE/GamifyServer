import { HttpException, HttpStatus } from '@nestjs/common';

export const checkAndThrowErr = (any: any, anyName: string) => {
  if (!any) throw new HttpException(`${anyName} не найден`, HttpStatus.BAD_REQUEST);
};
