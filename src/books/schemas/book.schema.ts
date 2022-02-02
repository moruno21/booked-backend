import { Schema } from 'mongoose';

export const BookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  image: String,
  available: Boolean,
});
