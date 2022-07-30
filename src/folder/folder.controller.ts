import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { CreateFolderDto } from './dto/createFolderDto';
import { FolderService } from './folder.service';
import { FolderDocument } from './schemas/folder.schema';

@Controller('/api/folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createAlbum(@Body() dto: CreateFolderDto): Promise<FolderDocument> {
    return this.folderService.createFolder(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/parents/:id')
  getChildrens(@Param() param: { id: string }): Promise<FolderDocument[]> {
    return this.folderService.getAllParents(param.id);
  }
}
