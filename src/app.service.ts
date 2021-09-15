import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/models/board/board.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private boardEntityRepository: Repository<BoardEntity>,
  ) {}

  async onModuleInit() {
    const [dbUser, dbUser2] = await this.userEntityRepository.find();

    if (!dbUser) {
      const userEntity = this.userEntityRepository.create({
        username: 'hello',
        password: 'world',
      });
      const createdUser = await this.userEntityRepository.save(userEntity);

      const boardEntity = this.boardEntityRepository.create({
        name: 'First board',
        users: [createdUser],
      });

      await this.boardEntityRepository.save(boardEntity);
    }

    if (!dbUser2) {
      const userEntity = this.userEntityRepository.create({
        username: 'hello2',
        password: 'world2',
      });
      const createdUser = await this.userEntityRepository.save(userEntity);

      const boardEntity = this.boardEntityRepository.create({
        name: 'Second board',
        users: [createdUser],
      });

      await this.boardEntityRepository.save(boardEntity);
    }
  }
}
