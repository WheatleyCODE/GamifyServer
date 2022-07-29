import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FolderModule } from 'src/folder/folder.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { TrackModule } from 'src/track/track.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TokensModule, FolderModule, TrackModule, AlbumModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
