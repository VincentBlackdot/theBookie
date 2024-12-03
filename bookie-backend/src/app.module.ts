import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables from .env file
    MongooseModule.forRoot(process.env.MONGO_URI),
    BooksModule,
  ],
})
export class AppModule {}
