import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatedUserDTO } from 'src/users/dto/created-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUser(payload.email);

    if (!user) {
      const newUser: CreatedUserDTO = {
        fullName: payload.name,
        email: payload.email,
        imageUrl: payload.picture,
      };
      return await this.userService.postUser(newUser);
    }
    return user;
  }
}
