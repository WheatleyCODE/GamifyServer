import { Controller, Get, Param } from '@nestjs/common';
import { StorageDocument } from './schemas/storage.schema';
import { StorageService } from './storage.service';

@Controller('/api/storages')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get(':id')
  getOneTrack(@Param() param: { id: string }): Promise<StorageDocument> {
    return this.storageService.getOneStorage(param.id);
  }
}
