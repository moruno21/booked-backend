import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtservice: JwtService) {}

  async validateUser(username: string) {
    const user = await this.usersService.getUser(username);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { access_token: this.jwtservice.sign(payload) };
  }

  async signInWithGoogle(data: any) {
    if (!data.user) throw new BadRequestException();

    let user = await this.usersService.getUser(data.user.email);
    if (user) return this.login(user);

    try {
      const newUser: User = {
        username: '',
        name: data.user.firstName,
        surname: data.user.lastName,
        email: data.user.email,
        image: '',
      };

      await this.usersService.postUser(newUser);
      return this.login(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
