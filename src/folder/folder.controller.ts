import { Body, Controller, Post } from '@nestjs/common';
import { CreateFolderDto } from './dto/createFolderDto';
import { FolderService } from './folder.service';
import { FolderDocument } from './schemas/folder.schema';

@Controller('/api/folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  createAlbum(@Body() dto: CreateFolderDto): Promise<FolderDocument> {
    console.log(dto);
    return this.folderService.createFolder(dto);
  }
}
