import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new Book()]),
            create: jest.fn().mockImplementation((book: Book) => Promise.resolve(book)),
            update: jest.fn().mockResolvedValue(new Book()),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(await booksController.findAll()).toEqual([new Book()]);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const book = new Book();
      book.title = 'New Book';
      book.author = 'Author Name';
      book.ISBN = '123456';

      expect(await booksController.create(book)).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const book = new Book();
      book.title = 'Updated Title';

      expect(await booksController.update(1, book)).toEqual(new Book());
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      expect(await booksController.delete(1)).toEqual(true);
    });
  });
});
