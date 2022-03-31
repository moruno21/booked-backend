import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  fullName: String,
  email: String,
  imageUrl: String,
});
