import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: process.env.DB_SERVER,
            port: 1433,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            options: {
              encrypt: true, // Enable encryption for Azure SQL Database
            },
            autoLoadEntities: true,
            synchronize: true,  // Use only in development, NOT in production
          }),
        BooksModule,
    ],
})
export class AppModule {}
