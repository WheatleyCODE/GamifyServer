import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { AlbumService } from './album.service';
import { ReplaceTracksDto } from './dto/replaceTracksDto';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { AlbumDocument } from './schemas/album.schema';
import { AddTrackDto } from './dto/AddTrackDto';

@Controller('/api/albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // Todo гварды
  // Todo Прокачать удаление Треков и Альбомов
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllAlbums(): Promise<AlbumDocument[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getOneAlbum(@Param() param: { id: string }): Promise<AlbumDocument> {
    return this.albumService.getOneAlbum(param.id);
  }

  // Todo валидация
  @Post()
  createAlbum(@Body() dto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.createAlbum(dto);
  }

  // Todo валидация
  @Post('/replace')
  replaceTracks(@Body() dto: ReplaceTracksDto): Promise<AlbumDocument> {
    return this.albumService.replaceTracks(dto);
  }

  // Todo валидация
  @Post('/add')
  addTrack(@Body() dto: AddTrackDto): Promise<AlbumDocument> {
    return this.albumService.addTrack(dto);
  }

  @Delete(':id')
  deleteOneAlbum(@Param() param: { id: string }): Promise<AlbumDocument> {
    return this.albumService.deleteOneAlbum(param.id);
  }

  // Todo валидация
  @Put(':id')
  updateOneTrack(@Param() param: { id: string }, @Body() dto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.updateOneAlbum(param.id, dto);
  }
}
