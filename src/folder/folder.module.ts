import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TokensModule } from 'src/tokens/tokens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [TokensModule, StorageModule, MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])],
  providers: [FolderService],
  controllers: [FolderController],
  exports: [FolderService],
})
export class FolderModule {}
