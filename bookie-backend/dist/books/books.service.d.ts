import { Repository } from 'typeorm';
import { Book } from './book.entity';
export declare class BooksService {
    private booksRepository;
    constructor(booksRepository: Repository<Book>);
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    update(id: number, book: Partial<Book>): Promise<Book | null>;
    delete(id: number): Promise<boolean>;
}
