import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * @class Book
 * @brief Represents a book in the library.
 */
@Entity()
export class Book {
    /**
     * @property {number} id - Unique identifier for the book.
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * @property {string} title - The title of the book.
     */
    @Column()
    title: string;

    /**
     * @property {string} author - The author of the book.
     */
    @Column()
    author: string;

    /**
     * @property {string | null} ISBN - The ISBN of the book (optional).
     */
    @Column({ nullable: true })
    ISBN?: string;
}
