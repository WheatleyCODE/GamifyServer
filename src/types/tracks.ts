import { Types } from 'mongoose';

export interface createTrackOptions {
  user: Types.ObjectId;
  name: string;
  author: string;
  listen?: number;
  text?: string;
  image: string;
  audio: string;
  parent?: Types.ObjectId;
  album?: Types.ObjectId;
}
