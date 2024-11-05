import { BooksService } from './books.service';
import { Book } from './book.entity';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    update(id: number, book: Partial<Book>): Promise<Book | null>;
    delete(id: number): Promise<boolean>;
}
