import { Types } from 'mongoose';

export interface CreateFolderOptions {
  user: Types.ObjectId;
  name: string;
  parent?: Types.ObjectId;
}
