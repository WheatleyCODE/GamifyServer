import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FolderService } from 'src/folder/folder.service';
import { TrackService } from 'src/track/track.service';
import { ChildrenDocuments } from 'src/types/search';

@Injectable()
export class SearchService {
  constructor(
    private readonly trackService: TrackService,
    private readonly folderService: FolderService,
    private readonly albumService: AlbumService,
  ) {}

  // ! Cделать что бы изменялась дата открытия
  async searchChildrens(id: string): Promise<ChildrenDocuments> {
    try {
      const tracks = await this.trackService.getAllTracksByParent(id);
      const folders = await this.folderService.getAllFoldersByParent(id);
      const albums = await this.albumService.getAllAlbumsByParent(id);

      return [...folders, ...albums, ...tracks];
    } catch (e) {
      throw e;
    }
  }
}
