import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Query,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { UpdateBookDto } from '../books/dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Express } from 'express';
import { Book } from './book.schema';
import { Types } from 'mongoose';
import { pdfFileUploadOptions } from '../utilities/file-upload.util';
import { S3 } from 'aws-sdk';
import { uploadFileToS3 } from '../utilities/s3-upload';
import axios from 'axios';
import { Response } from 'express';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @ApiOperation({ summary: 'Retrieve all books' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all books',
    type: [Book],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Book[]> {
    return this.booksService.findAll(page, limit, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the book',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async findById(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Get('pdf/:id')
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.booksService.findById(id);
      if (!book?.pdfUrl) {
        return res.status(404).json({ message: 'PDF not found' });
      }

      const response = await axios({
        method: 'get',
        url: book.pdfUrl,
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${book.title}.pdf"`);
      return res.send(response.data);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      return res.status(500).json({ message: 'Error fetching PDF' });
    }
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    description: 'Book data with an optional PDF file and cover image',
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new book',
    type: Book,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (e.g., missing required fields or file)',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pdfFile', maxCount: 1 },
      { name: 'coverFile', maxCount: 1 },
    ])
  )
  async create(
    @Body() bookDto: CreateBookDto,
    @UploadedFiles() files: { pdfFile?: Express.Multer.File[]; coverFile?: Express.Multer.File[] },
  ) {
    try {
      // Validate and upload PDF
      const pdfFile = files.pdfFile?.[0];
      if (!pdfFile) {
        throw new BadRequestException('PDF file is required');
      }

      const pdfUrl = await uploadFileToS3(pdfFile, process.env.S3_BUCKET_NAME, 'pdfs');

      // Upload cover image if provided
      let coverUrl = '';
      const coverFile = files.coverFile?.[0];
      if (coverFile) {
        coverUrl = coverFile ? await uploadFileToS3(coverFile, process.env.S3_BUCKET_NAME, 'covers') : '';
      }

      // Save book to database
      const newBook = await this.booksService.create({
        ...bookDto,
        pdfUrl,
        coverUrl,
      });

      return newBook;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new BadRequestException('Failed to upload files');
    }
  }

  @Put(':id/downloads')
  @ApiOperation({ summary: 'Increment the download count of a book' })
  async incrementDownloads(@Param('id') id: string): Promise<Book> {
    const updatedBook = await this.booksService.incrementDownloads(id);
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }
    return updatedBook;
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update book status (bestseller/featured)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the book status',
    type: Book,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid book ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() statusUpdate: { isBestSeller: boolean; isFeatured: boolean },
  ): Promise<Book> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    const { isBestSeller, isFeatured } = statusUpdate;

    try {
      return await this.booksService.updateStatus(id, isBestSeller, isFeatured);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while updating the book status');
    }
  }

  @Put(':id') // Expecting the ID as part of the route
  async update(
    @Param('id') id: string,
    @Body() bookDto: UpdateBookDto,
    @UploadedFile() file?: Express.Multer.File, // Optional file
  ): Promise<any> {
    // Validate ID format
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    // Check if the book exists
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Validate ISBN if provided
    if (bookDto.ISBN) {
      const existingBook = await this.booksService.findByISBN(bookDto.ISBN);
      if (existingBook && existingBook._id.toString() !== id) {
        throw new BadRequestException('Another book with this ISBN already exists');
      }
    }

    // Dynamically update fields
    const updates = { ...bookDto };

    // Update the file if provided
    // if (file) {
    //   updates.pdfUrl = file.filename; // Replace with the new file's filename
    // }

    try {
      // Save updates to the database
      const updatedBook = await this.booksService.update(id, updates);
      return {
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
      };
    } catch (error) {
      console.error('Error updating the book:', error);
      throw new InternalServerErrorException('An error occurred while updating the book');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the book',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (e.g., invalid ID format)',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async delete(@Param('id') id: string): Promise<boolean> {
    // Validate ID format
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid book ID format');
    }

    // Attempt to delete the book
    const deleted = await this.booksService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Book not found');
    }

    return true;
  }
}
