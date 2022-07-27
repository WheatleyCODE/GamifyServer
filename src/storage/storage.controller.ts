import { Controller } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('/api/storage')
export class StorageController {
  constructor(private readonly trackService: StorageService) {}
}
