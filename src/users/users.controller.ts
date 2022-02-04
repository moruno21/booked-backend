import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatedUserDTO } from './dto/created-user.dto';
import { User } from './interfaces/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':email')
  getUser(@Param('email') email): Promise<User> {
    return this.userService.getUser(email);
  }

  @Post()
  createUser(@Body() createdUser: CreatedUserDTO): Promise<User> {
    return this.userService.postUser(createdUser);
  }
}
