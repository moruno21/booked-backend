import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSchema } from 'src/users/schema/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInWithGoogleRedirect(@Req() req, @Res() res) {
    this.authService.signInWithGoogle(req);
    return res.redirect('/');
  }
}
