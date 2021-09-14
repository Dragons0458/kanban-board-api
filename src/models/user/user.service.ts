import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from 'src/inputs/login.input';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    const [dbUser, dbUser2] = await this.userEntityRepository.find();

    if (!dbUser) {
      const userEntity = this.userEntityRepository.create({
        username: 'hello',
        password: 'world',
      });
      await this.userEntityRepository.save(userEntity);
    }

    if (!dbUser2) {
      const userEntity = this.userEntityRepository.create({
        username: 'hello2',
        password: 'world2',
      });
      await this.userEntityRepository.save(userEntity);
    }
  }

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
}
