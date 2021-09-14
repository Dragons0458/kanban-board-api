import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return {
      hello: 1,
    };
  }
}
