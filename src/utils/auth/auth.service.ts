import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/inputs/login.input';
import { UserEntity } from 'src/models/user/user.entity';
import { UserService } from 'src/models/user/user.service';
import { LoginResponse } from 'src/responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<UserEntity | undefined> {
    return await this.userService.findOneByLoginInput(loginInput);
  }

  login(userEntity: UserEntity): LoginResponse {
    const payload = { username: userEntity.username, sub: userEntity.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
