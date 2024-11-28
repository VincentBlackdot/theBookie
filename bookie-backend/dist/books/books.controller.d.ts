import { BooksService } from './books.service';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { Book } from './book.schema';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<Book[]>;
    create(bookDto: CreateBookDto, file: Express.Multer.File): Promise<Book>;
    update(id: string, bookDto: Partial<CreateBookDto>, file: Express.Multer.File): Promise<Book | null>;
    delete(id: string): Promise<boolean>;
}
