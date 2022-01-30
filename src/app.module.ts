import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const url = process.env.MONGO_URL || 'mongodb:27017';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${url}/tasks`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
