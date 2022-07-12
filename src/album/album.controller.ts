import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumService } from './album.service';

@Controller('/albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAll();
  }

  @Get('/:id')
  getOneAlbum() {
    return this.albumService.getOne();
  }
}
