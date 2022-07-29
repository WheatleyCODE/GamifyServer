import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ChildrenDocuments } from 'src/types/search';
import { SearchService } from './search.service';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/childrens/:id')
  getAllTracks(@Param() param: { id: string }): Promise<ChildrenDocuments> {
    return this.searchService.searchChildrens(param.id);
  }
}
