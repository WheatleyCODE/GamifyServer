import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { DeletePostDto } from './dto/delete-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(dto: CreatePostDto): Promise<Post> {
    try {
      return await this.postModel.create({ ...dto });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<Post[]> {
    try {
      return await this.postModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<Post> {
    try {
      return await this.postModel.findOne({ title: 'Title' });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(dto: DeletePostDto): Promise<Post> {
    try {
      return await this.postModel.findByIdAndDelete(dto.id);
    } catch (e) {
      console.log(e);
    }
  }
}
