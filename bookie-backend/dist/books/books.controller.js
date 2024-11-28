"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const create_book_dto_1 = require("../books/dto/create-book.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const book_schema_1 = require("./book.schema");
const mongoose_1 = require("mongoose");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async findAll() {
        return this.booksService.findAll();
    }
    async create(bookDto, file) {
        const book = new book_schema_1.Book();
        book.title = bookDto.title;
        book.author = bookDto.author;
        book.ISBN = bookDto.ISBN;
        if (!book.author) {
            throw new common_1.BadRequestException('Author is required');
        }
        if (!book.ISBN) {
            throw new common_1.BadRequestException('ISBN is required');
        }
        const existingBook = await this.booksService.findByISBN(book.ISBN);
        if (existingBook) {
            throw new common_1.BadRequestException('A book with this ISBN already exists');
        }
        if (!file) {
            throw new common_1.BadRequestException('PDF file is required');
        }
        try {
            if (file) {
                book.pdfUrl = file.filename;
            }
            return await this.booksService.create(book);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An unexpected error occurred while processing the request');
        }
        return this.booksService.create(book);
    }
    async update(id, bookDto, file) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid book ID format');
        }
        const book = await this.booksService.findById(id);
        if (!book) {
            throw new common_1.BadRequestException('Book not found');
        }
        if (!bookDto.author) {
            throw new common_1.BadRequestException('Author is required');
        }
        if (!bookDto.ISBN) {
            throw new common_1.BadRequestException('ISBN is required');
        }
        if (!file) {
            throw new common_1.BadRequestException('PDF file is required');
        }
        book.title = bookDto.title || book.title;
        book.author = bookDto.author || book.author;
        book.ISBN = bookDto.ISBN || book.ISBN;
        try {
            if (file) {
                book.pdfUrl = file.filename;
            }
            return await this.booksService.update(id, book);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('An unexpected error occurred while processing the request');
        }
        return this.booksService.update(id, book);
    }
    async delete(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid book ID format');
        }
        const deleted = await this.booksService.delete(id);
        if (!deleted) {
            throw new common_1.NotFoundException('Book not found');
        }
        return true;
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Book data with an optional PDF file',
        type: create_book_dto_1.CreateBookDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileExtension = (0, path_1.extname)(file.originalname);
                const filename = `${Date.now()}${fileExtension}`;
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Only PDF files are allowed'), false);
            }
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Updated book data with an optional PDF file',
        type: create_book_dto_1.CreateBookDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileExtension = (0, path_1.extname)(file.originalname);
                const filename = `${Date.now()}${fileExtension}`;
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Only PDF files are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "delete", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map