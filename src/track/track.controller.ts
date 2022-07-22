import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track, TrackDocument } from './schemas/track.schema';
import { TrackService } from './track.service';

@Controller('/api/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTracks(@Query('count') count: number, @Query('offset') offset: number): Promise<Track[]> {
    return this.trackService.getAllTracks(count, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneTrack(@Param() param: { id: string }): Promise<Track> {
    return this.trackService.getOneTrack(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @Post()
  createTrack(
    @UploadedFiles() files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
    @Body() dto: CreateTrackDto,
  ): Promise<Track> {
    const { image, audio } = files;
    return this.trackService.createTrack(dto, image[0], audio[0]);
  }

  @UseGuards(JwtAuthGuard)
  // Todo Прокачать удаление Треков и Альбомов
  @Delete(':id')
  deleteOneTrack(@Param() param: { id: string }): Promise<TrackDocument> {
    return this.trackService.deleteOneTrack(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  updateOneTrack(@Param() param: { id: string }, @Body() dto: CreateTrackDto): Promise<TrackDocument> {
    return this.trackService.updateOneTrack(param.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/listen/:id')
  listen(@Param() param: { id: string }): Promise<void> {
    return this.trackService.listen(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/t/search')
  search(@Query('query') query: string): Promise<TrackDocument[]> {
    return this.trackService.search(query);
  }
}
