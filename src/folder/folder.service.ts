import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoService } from 'src/core/MongoService';
import { StorageService } from 'src/storage/storage.service';
import { CreateFolderOptions } from 'src/types/folder';
import { CreateFolderDto } from './dto/createFolderDto';
import { Folder, FolderDocument } from './schemas/folder.schema';

@Injectable()
export class FolderService extends MongoService {
  constructor(
    @InjectModel(Folder.name) private readonly folderModel: Model<FolderDocument>,
    private readonly storageService: StorageService,
  ) {
    super(folderModel);
  }

  async createFolder(dto: CreateFolderDto): Promise<FolderDocument> {
    try {
      const { storageId, name, parentId } = dto;

      const storage = await this.storageService.getOneStorage(storageId);
      const newFolder = await this.createOne<FolderDocument, CreateFolderOptions>({
        user: storage.user,
        name,
        parent: parentId ? new Types.ObjectId(parentId) : undefined,
      });

      if (!parentId) {
        storage.folders.push(newFolder._id);
        await storage.save();
      }

      return newFolder;
    } catch (e) {
      throw e;
    }
  }

  async getAllFoldersByParent(parentId: string): Promise<FolderDocument[]> {
    try {
      return await this.folderModel.find({ parent: new Types.ObjectId(parentId) });
    } catch (e) {
      throw e;
    }
  }

  async getAllParents(id: string): Promise<FolderDocument[]> {
    try {
      const parents = [];
      const folder = await this.folderModel.findById(id);

      if (!folder) throw new HttpException('Папка не найдена', HttpStatus.BAD_REQUEST);
      parents.push(folder);

      let isParent = false;
      let current = folder;
      if (folder.parent) isParent = true;

      while (isParent) {
        if (!current.parent) {
          isParent = false;
          continue;
        }

        const parentFolder = await this.folderModel.findById(current.parent);
        parents.push(parentFolder);
        current = parentFolder;
      }

      return parents.reverse();
    } catch (e) {
      throw e;
    }
  }
}
