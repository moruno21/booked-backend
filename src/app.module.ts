import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const url = process.env.MONGO_URL || 'mongodb:27017';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${url}/tasks`)],
  controllers: [],
  providers: [],
})
export class AppModule {}
