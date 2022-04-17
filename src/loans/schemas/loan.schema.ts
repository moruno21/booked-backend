import { Schema } from 'mongoose';

export const LoanSchema = new Schema({
  userEmail: String,
  bookId: String,
  initialDate: Date,
  finalDate: Date,
});
