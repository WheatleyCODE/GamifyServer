import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { CreateTrackDto } from './dto/createTrackDto';
import { TrackDocument } from './schemas/track.schema';
import { TrackService } from './track.service';

@Controller('/api/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  // Todo гварды
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllTracks(): Promise<TrackDocument[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOneTrack(@Param() param: { id: string }): Promise<TrackDocument> {
    return this.trackService.findTrackBy({ _id: param.id });
  }

  // Todo валидация
  @Post()
  createTrack(@Body() dto: CreateTrackDto): Promise<TrackDocument> {
    return this.trackService.create(dto);
  }

  @Delete(':id')
  deleteOneTrack(@Param() param: { id: string }): Promise<TrackDocument> {
    return this.trackService.deleteOne(param.id);
  }

  // Todo валидация
  @Put(':id')
  updateOneTrack(@Param() param: { id: string }, @Body() dto: CreateTrackDto): Promise<TrackDocument> {
    return this.trackService.updateOne(param.id, dto);
  }
}
