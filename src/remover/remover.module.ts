import { Module } from '@nestjs/common';
import { RemoverService } from './remover.service';
import { RemoverController } from './remover.controller';
import { TokensModule } from 'src/tokens/tokens.module';
import { FolderModule } from 'src/folder/folder.module';
import { CommentModule } from 'src/comment/comment.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TokensModule, FolderModule, CommentModule, AlbumModule],
  providers: [RemoverService],
  controllers: [RemoverController],
})
export class RemoverModule {}
