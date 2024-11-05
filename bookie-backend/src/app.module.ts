// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'bookie.db',
            entities: [Book],
            synchronize: true, // Automatically syncs database schema (use only in development)
        }),
        BooksModule,
    ],
})
export class AppModule {}
