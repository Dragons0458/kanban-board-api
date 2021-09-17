import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/models/board/board.entity';
import { TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private boardEntityRepository: Repository<BoardEntity>,
    @InjectRepository(TaskEntity)
    private taskEntityRepository: Repository<TaskEntity>,
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

    const tasksToCreate = [
      {
        title: 'First task',
        scrumPunctuation: 1,
        description: 'This is the first task',
        boardId: 1,
      },
      {
        title: 'Second task',
        scrumPunctuation: 2,
        description: 'This is the second task',
        boardId: 1,
      },
      {
        title: 'Third task',
        scrumPunctuation: 3,
        description: 'This is the third task',
        boardId: 2,
      },
      {
        title: 'Fourth task',
        scrumPunctuation: 4,
        description: 'This is the fourth task',
        boardId: 2,
      },
    ];
    const tasks = await this.taskEntityRepository.find();
    const tasksPromisesToCreate: Promise<TaskEntity>[] = [];

    for (let i = 0; i < tasksToCreate.length; i++) {
      const task = tasks[i];

      if (!task) {
        const taskEntity = this.taskEntityRepository.create(tasksToCreate[i]);

        tasksPromisesToCreate.push(this.taskEntityRepository.save(taskEntity));
      }
    }

    await Promise.all(tasksPromisesToCreate);
  }
}
