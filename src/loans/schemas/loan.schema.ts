import { Schema } from 'mongoose';

export const LoanSchema = new Schema({
  userId: String,
  bookId: String,
  initialDate: Date,
  finalDate: Date,
});
