import { ValidationPipe } from './../pipes/validation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { AlbumService } from './album.service';
import { ReplaceTracksDto } from './dto/replaceTracksDto';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { AlbumDocument } from './schemas/album.schema';
import { AddTrackDto } from './dto/AddTrackDto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/api/albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAlbums(): Promise<AlbumDocument[]> {
    return this.albumService.getAllAlbums();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneAlbum(@Param() param: { id: string }): Promise<AlbumDocument> {
    return this.albumService.getOneAlbum(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  createAlbum(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() dto: CreateAlbumDto,
  ): Promise<AlbumDocument> {
    const { image } = files;
    return this.albumService.createAlbum(dto, image[0]);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/replace')
  replaceTracks(@Body() dto: ReplaceTracksDto): Promise<AlbumDocument> {
    return this.albumService.replaceTracks(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/add')
  addTrack(@Body() dto: AddTrackDto): Promise<AlbumDocument> {
    return this.albumService.addTrack(dto);
  }

  @UseGuards(JwtAuthGuard)
  // Todo Прокачать удаление Треков и Альбомов
  @Delete(':id')
  deleteOneAlbum(@Param() param: { id: string }): Promise<AlbumDocument> {
    return this.albumService.deleteOneAlbum(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  updateOneTrack(@Param() param: { id: string }, @Body() dto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.updateOneAlbum(param.id, dto);
  }
}
