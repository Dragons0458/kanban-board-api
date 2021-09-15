import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from 'src/inputs/login.input';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async findOneByLoginInput(
    loginInput: LoginInput,
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({
      where: {
        username: loginInput.username,
        password: loginInput.password,
      },
    });
  }

  async userHasPermission(userId: number, boardId: number): Promise<boolean> {
    const user = await this.userEntityRepository.findOne({
      relations: ['boards'],
      where: {
        id: userId,
      },
    });

    return user?.boards?.some((board) => board.id === boardId) || false;
  }
}
