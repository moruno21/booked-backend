import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';

const url = process.env.MONGO_URL || 'mongodb:27017';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${url}/booked`), BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
