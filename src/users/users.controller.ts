import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles-auth.decorator';
// import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/types/users';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Todo добавить Guard'ы
  // @UseGuards(JwtAuthGuard)
  // @Roles(UserRoles.ADMIN)
  @Roles(UserRoles.USER)
  @UseGuards(RolesGuard)
  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userService.getAll();
  }
}
