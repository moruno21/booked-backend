import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreatedBookDTO } from './dto/created-book.dto';
import { Book } from './interfaces/book';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') bookId): Promise<Book> {
    return this.booksService.getBook(bookId);
  }

  @Post()
  createBook(@Body() createdBook: CreatedBookDTO): Promise<Book> {
    return this.booksService.postBook(createdBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Promise<string> {
    return this.booksService.deleteBook(bookId);
  }

  @Put(':bookId')
  updateBook(@Body() createdBook: CreatedBookDTO, @Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.updateBook(createdBook, bookId);
  }
}
