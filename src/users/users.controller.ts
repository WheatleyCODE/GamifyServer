import { Controller, Get } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userService.getAll();
  }
}
