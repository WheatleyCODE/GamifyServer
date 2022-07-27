import { Types } from 'mongoose';
export interface CreateAlbumOptions {
  user: Types.ObjectId;
  name: string;
  author: string;
  image?: string;
  parent?: Types.ObjectId;
}
