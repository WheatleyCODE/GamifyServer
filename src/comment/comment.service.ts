import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.commentModel.create({ ...dto });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<Comment[]> {
    try {
      return await this.commentModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(): Promise<Comment> {
    try {
      return await this.commentModel.findOne({ text: 'This is text' });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(dto: DeleteCommentDto): Promise<Comment> {
    try {
      return await this.commentModel.findByIdAndDelete(dto.id);
    } catch (e) {
      console.log(e);
    }
  }
}
