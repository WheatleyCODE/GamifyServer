import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [TokensModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
