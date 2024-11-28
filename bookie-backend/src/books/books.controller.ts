import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '../books/dto/create-book.dto'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { Book } from './book.schema';
import { Types } from 'mongoose';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book data with an optional PDF file',
    type: CreateBookDto, // Use DTO for validation
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
      } else {
        // Reject the file with a custom error message
        cb(new BadRequestException('Only PDF files are allowed'), false);
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024,  // Limit file size to 10 MB
    },
  }))
  
  
  async create(
    @Body() bookDto: CreateBookDto, // Use DTO here for validation
    @UploadedFile() file: Express.Multer.File, // Correctly typed now
  ): Promise<Book> {
    // Manually map the DTO to the Book entity if necessary
    const book = new Book();
    book.title = bookDto.title;
    book.author = bookDto.author;
    book.ISBN = bookDto.ISBN;

    // Check for missing required fields (author and ISBN)
    if (!book.author) {
      throw new BadRequestException('Author is required');
    }

    if (!book.ISBN) {
      throw new BadRequestException('ISBN is required');
    }

    const existingBook = await this.booksService.findByISBN(book.ISBN);
    if (existingBook) {
      throw new BadRequestException('A book with this ISBN already exists');
    }

    
    if (!file) {
      throw new BadRequestException('PDF file is required');
    }


    try {
      if (file) {
        book.pdfUrl = file.filename;
      }
      return await this.booksService.create(book);
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while processing the request');
    }
    
    // Now, you can pass the mapped book entity to the service
    return this.booksService.create(book);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Updated book data with an optional PDF file',
    type: CreateBookDto, // Use DTO for validation
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept the file
      } else {
        // Reject the file with a custom error message
        cb(new BadRequestException('Only PDF files are allowed'), false);
      }
    },
  }))
  async update(
    @Param('id') id: string,
    @Body() bookDto: Partial<CreateBookDto>, // Use DTO for validation
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Book | null> {

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    // Map DTO to Book entity
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    // Handle missing required fields (author and ISBN)
    if (!bookDto.author) {
      throw new BadRequestException('Author is required');
    }

    if (!bookDto.ISBN) {
      throw new BadRequestException('ISBN is required');
    }

    if (!file) {
      throw new BadRequestException('PDF file is required');
    }

    book.title = bookDto.title || book.title;
    book.author = bookDto.author || book.author;
    book.ISBN = bookDto.ISBN || book.ISBN;
    try {
      if (file) {
        book.pdfUrl = file.filename;
      }

      return await this.booksService.update(id, book);
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while processing the request');
    }
    
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    // Validate ID format
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    const deleted = await this.booksService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Book not found');
    }
    return true;
  }
}
