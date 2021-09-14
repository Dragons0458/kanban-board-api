import { IsJWT } from 'class-validator';

export class LoginResponse {
  @IsJWT()
  access_token: string;
}
