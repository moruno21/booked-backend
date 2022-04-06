import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  async logInWithGoogle() {}

  @Get('google/redirect')
  async logInWithGoogleRedirect(@Req() req) {
    return this.authService.logInWithGoogle(req);
  }
}
