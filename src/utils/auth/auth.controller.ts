import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/models/user/user.entity';
import { LoginResponse } from 'src/responses/login.response';
import { AuthService } from 'src/utils/auth/auth.service';
import { LocalAuthGuard } from 'src/utils/auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: UserEntity }): LoginResponse {
    return this.authService.login(req.user);
  }
}
