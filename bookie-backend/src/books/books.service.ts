import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  // Find book by ISBN
  async findByISBN(ISBN: string): Promise<Book | null> {
    return this.bookModel.findOne({ ISBN }).exec();
  }

  // Find book by ID
  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  // Find all books with optional filters, pagination, and sorting
  async findAll(
    page = 1,
    limit = 10,
    order: 'asc' | 'desc' = 'asc',
  ): Promise<Book[]> {
    const sortOrder = order === 'asc' ? 1 : -1;
    return this.bookModel
      .find()
      .sort({ title: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
  
  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      if (createBookDto.ISBN) {
        const existingBook = await this.bookModel.findOne({ ISBN: createBookDto.ISBN });
        if (existingBook) {
          throw new BadRequestException('A book with this ISBN already exists');
        }
      }

      const newBook = new this.bookModel({
        ...createBookDto,
        downloads: 0, // Ensure downloads starts at 0
      });
      return await newBook.save();
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  // Update an existing book
  async update(id: string, book: Partial<Book>): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(
      id,
      { $set: book },
      { new: true }
    ).exec();
  }

  // Increment downloads
  async incrementDownloads(id: string): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true }
    ).exec();
  }

  // Delete a book
  async delete(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    return result ? true : false;
  }

  // Update bestseller or featured status
  async updateStatus(id: string, isBestSeller: boolean, isFeatured: boolean): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(
      id,
      { isBestSeller, isFeatured },
      { new: true },
    ).exec();
  }
}
