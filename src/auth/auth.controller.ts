import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async logInWithGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async logInWithGoogleRedirect(@Req() req) {
    return this.authService.logInWithGoogle(req);
  }
}
