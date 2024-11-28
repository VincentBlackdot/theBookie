import { Model } from 'mongoose';
import { Book } from './book.schema';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<Book>);
    findByISBN(ISBN: string): Promise<Book | null>;
    findById(id: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    update(id: string, book: Partial<Book>): Promise<Book | null>;
    delete(id: string): Promise<boolean>;
}
