import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BooksService {

  
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

   // Add the findByISBN method
   async findByISBN(ISBN: string): Promise<Book | null> {
    return this.bookModel.findOne({ where: { ISBN } });
  }

    // Find book by ID
    async findById(id: string): Promise<Book | null> {
      return this.bookModel.findById(id).exec();
    }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }


  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async update(id: string, book: Partial<Book>): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    return result ? true : false;
  }
}
