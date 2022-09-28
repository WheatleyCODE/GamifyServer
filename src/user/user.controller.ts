import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/types/users';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(UserRoles.USER)
  @UseGuards(RolesGuard)
  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userService.getAll();
  }
}
