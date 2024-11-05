// src/books/books.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

/**
 * @class BooksController
 * @brief Controller for handling book-related HTTP requests.
 */
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    /**
     * @brief Fetches all books.
     * @returns {Promise<Book[]>} A promise that resolves to an array of Book objects.
     */
    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    /**
     * @brief Creates a new book.
     * @param {Book} book - The book data to be created.
     * @returns {Promise<Book>} A promise that resolves to the created book object.
     */
    @Post()
    async create(@Body() book: Book): Promise<Book> {
        return this.booksService.create(book);
    }

    /**
     * @brief Updates a specific book by ID.
     * @param {number} id - The ID of the book to update.
     * @param {Partial<Book>} book - The book data to be updated.
     * @returns {Promise<Book | null>} The updated book object, or null if not found.
     */
    @Put(':id')
    async update(@Param('id') id: number, @Body() book: Partial<Book>): Promise<Book | null> {
        return this.booksService.update(id, book);
    }

    /**
     * @brief Deletes a specific book by ID.
     * @param {number} id - The ID of the book to delete.
     * @returns {Promise<boolean>} True if the book was deleted, otherwise false.
     */
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<boolean> {
        return this.booksService.delete(id);
    }
}
