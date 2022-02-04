import { Controller, Get, Param } from '@nestjs/common';
import { User } from './interfaces/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':username')
  getUser(@Param('username') username): Promise<User> {
    return this.userService.getUser(username);
  }
}
