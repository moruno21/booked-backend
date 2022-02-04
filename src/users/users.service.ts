import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatedUserDTO } from './dto/created-user.dto';
import { User } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async postUser(createdUser: CreatedUserDTO): Promise<User> {
    const newUser = new this.userModel(createdUser);
    return await newUser.save();
  }
}
