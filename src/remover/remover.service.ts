import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { AlbumCommentService } from 'src/comment/albumComment.service';
import { TrackCommentService } from 'src/comment/trackComment.service';
import { FolderService } from 'src/folder/folder.service';
import { ItemTypes } from 'src/types/storage';

@Injectable()
export class RemoverService {
  constructor(
    private readonly folderService: FolderService,
    private readonly albumService: AlbumService,
    private readonly trackCommentService: TrackCommentService,
    private readonly albumCommentService: AlbumCommentService,
  ) {}

  async deleteOne(id: string, type: ItemTypes): Promise<any> {
    try {
      return await this[`${type}Service`].removeOne(id);
    } catch (e) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
