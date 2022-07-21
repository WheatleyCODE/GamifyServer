import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumService } from 'src/album/album.service';
import { MongoService } from 'src/core/MongoService';
import { createAlbumCommentOptions } from 'src/types/comments';
import { CreateAlbumCommentDto } from './dto/createAlbumCommentDto';
import { AlbumComment, AlbumCommentDocument } from './schemas/albumComment.schema';

@Injectable()
export class AlbumCommentService extends MongoService {
  constructor(
    @InjectModel(AlbumComment.name) private readonly albumCommentModel: Model<AlbumCommentDocument>,
    private readonly albumService: AlbumService,
  ) {
    super(albumCommentModel);
  }

  async createAlbumComment(options: CreateAlbumCommentDto): Promise<AlbumCommentDocument> {
    try {
      const { userId, albumId, text } = options;
      const album = await this.albumService.getOneAlbum(albumId);

      const albumComment = await this.createOne<AlbumCommentDocument, createAlbumCommentOptions>({
        user: userId,
        album: albumId,
        text,
      });

      album.comments.push(albumComment._id);
      await album.save();
      return albumComment;
    } catch (e) {
      throw e;
    }
  }
}
