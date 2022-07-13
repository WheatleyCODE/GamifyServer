import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOneUser() {
    return this.userService.getOne();
  }
}
