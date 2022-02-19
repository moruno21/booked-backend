import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansModule } from 'src/loans/loans.module';
import { LoansService } from 'src/loans/loans.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), LoansModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
