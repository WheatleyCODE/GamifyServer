import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      // Todo переписать на асинхронные методы
      const randomString = uuid.v4();
      const fileName = `${randomString}.${'Расширение файла'}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Ошибка при записи файла файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
