import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';
import { ConfigModule } from '@nestjs/config';

const url = process.env.MONGO_URL || 'mongodb:27017';

@Module({
  imports: [
    ConfigModule.forRoot(), //Needed to load .env files
    MongooseModule.forRoot(`mongodb://${url}/booked`),
    BooksModule,
    UsersModule,
    AuthModule,
    LoansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
