import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
