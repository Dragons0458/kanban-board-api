import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from 'src/models/user/user.entity';

export class LoginInput extends PickType(UserEntity, [
  'username',
  'password',
] as const) {}
