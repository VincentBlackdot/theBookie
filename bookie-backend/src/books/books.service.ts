import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

/**
 * @class BooksService
 * @brief Service to manage book operations.
 */
@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) {}

    /**
     * @brief Finds all books in the library.
     * @returns {Promise<Book[]>} A promise that resolves to an array of Book objects.
     */
    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    /**
     * @brief Creates a new book entry.
     * @param {Book} book - The book object to create.
     * @returns {Promise<Book>} A promise that resolves to the created book.
     */
    async create(book: Book): Promise<Book> {
        return await this.booksRepository.save(book);
    }

    /**
     * @brief Updates an existing book.
     * @param {number} id - The ID of the book to update.
     * @param {Partial<Book>} book - The updated book data.
     * @returns {Promise<Book | null>} The updated book, or null if not found.
     */
    async update(id: number, book: Partial<Book>): Promise<Book | null> {
        await this.booksRepository.update(id, book);
        return this.booksRepository.findOne({ where: { id } });
    }

    /**
     * @brief Deletes a book by ID.
     * @param {number} id - The ID of the book to delete.
     * @returns {Promise<boolean>} True if the book was deleted, otherwise false.
     */
    async delete(id: number): Promise<boolean> {
        const result = await this.booksRepository.delete(id);
        return result.affected > 0;
    }
}
