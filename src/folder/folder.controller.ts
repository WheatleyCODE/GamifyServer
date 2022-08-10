import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { CreateFolderDto } from './dto/createFolderDto';
import { FolderService } from './folder.service';
import { FolderDocument } from './schemas/folder.schema';
import { RenameFolderDto } from './dto/renameFolderDto';
import { ChangeFolderAccessType } from './dto/changeFolderAccessType';
import { CreateFolderAccessLink } from './dto/createFolderAccessLink';

@Controller('/api/folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createFolder(@Body() dto: CreateFolderDto): Promise<FolderDocument> {
    return this.folderService.createFolder(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/parents/:id')
  getChildrens(@Param() param: { id: string }): Promise<FolderDocument[]> {
    return this.folderService.getAllParents(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/rename')
  renameFolder(@Body() dto: RenameFolderDto): Promise<FolderDocument> {
    return this.folderService.renameFolder(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/change/access')
  changeAccessType(@Body() dto: ChangeFolderAccessType): Promise<FolderDocument> {
    return this.folderService.changeFolderAccessType(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create/access-link')
  createAccessLink(@Body() dto: CreateFolderAccessLink): Promise<FolderDocument> {
    return this.folderService.createFolderAccessLink(dto);
  }
}
