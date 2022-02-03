import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  name: String,
  surname: String,
  email: String,
  image: String,
});
