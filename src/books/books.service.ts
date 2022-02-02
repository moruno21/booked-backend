import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatedBookDTO } from './dto/created-book.dto';
import { Book } from './interfaces/book';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}

  async getBooks(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async getBook(bookId: string): Promise<Book> {
    return await this.bookModel.findById(bookId);
  }

  async getAvailableBooks(): Promise<Book[]> {
    return await this.bookModel.find({ available: true });
  }

  async postBook(createdBook: CreatedBookDTO): Promise<Book> {
    const newBook = new this.bookModel(createdBook);
    return await newBook.save();
  }

  async deleteBook(bookId: string): Promise<string> {
    await this.bookModel.deleteOne({ _id: bookId });
    return `Book ${bookId} deleted`;
  }

  async updateBook(updatedBook: CreatedBookDTO, bookId: string): Promise<Book> {
    await this.bookModel.findByIdAndUpdate(bookId, updatedBook);
    return this.getBook(bookId);
  }
}
