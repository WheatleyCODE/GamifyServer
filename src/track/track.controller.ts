import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAll();
  }

  @Get('/:id')
  getOneTrack() {
    return this.trackService.getOne();
  }
}
