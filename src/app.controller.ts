import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/models/user/user.entity';
import { LoginResponse } from 'src/responses/login.response';
import { AuthService } from 'src/utils/auth/auth.service';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/utils/auth/local-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: { user: UserEntity }): LoginResponse {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return {
      hello: 1,
    };
  }
}
