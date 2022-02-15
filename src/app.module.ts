import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const url = process.env.MONGO_URL || 'mongodb:27017';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${url}/booked`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BooksModule,
    UsersModule,
    AuthModule,
    LoansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
