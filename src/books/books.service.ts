import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { throwError } from 'rxjs';
import { isValidMongoId } from 'src/shared/isValidMongoId';
import { CreatedBookDTO } from './dto/created-book.dto';
import { Book } from './interfaces/book';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async getBooks(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async getBook(bookId: string): Promise<Book> {
    isValidMongoId(bookId);
    const book = await this.bookModel.findById(bookId);
    if (!book) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    return book;
  }

  async postBook(createdBook: CreatedBookDTO): Promise<Book> {
    const newBook = new this.bookModel(createdBook);
    return await newBook.save();
  }

  async deleteBook(bookId: string): Promise<string> {
    isValidMongoId(bookId);
    await this.bookModel.deleteOne({ _id: bookId });
    return `Book ${bookId} deleted`;
  }

  async updateBook(updatedBook: CreatedBookDTO, bookId: string): Promise<Book> {
    isValidMongoId(bookId);
    await this.bookModel.findByIdAndUpdate(bookId, updatedBook);
    return this.getBook(bookId);
  }
}
