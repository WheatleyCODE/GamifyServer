import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(process.env.URL_MONGO),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
