import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { CreateTaskInput } from 'src/models/task/inputs/create-task.input';
import { UpdateArchiveStatusInput } from 'src/models/task/inputs/update-archive-status.input';
import { UpdateColumnStatusInput } from 'src/models/task/inputs/update-column-status.input';
import { TaskEntity } from 'src/models/task/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskEntityRepository: Repository<TaskEntity>,
  ) {}

  async onModuleInit() {
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

  async getAll(boardIdInput: BoardIdInput): Promise<TaskEntity[]> {
    return this.taskEntityRepository.find({
      where: {
        boardId: boardIdInput.boardId,
      },
    });
  }

  async create(createTaskInput: CreateTaskInput) {
    const taskEntity = this.taskEntityRepository.create(createTaskInput);

    await this.taskEntityRepository.save(taskEntity);
  }

  async archive(updateArchiveStatus: UpdateArchiveStatusInput) {
    const task = this.taskEntityRepository.create({
      isArchived: updateArchiveStatus.isArchived,
    });

    await this.taskEntityRepository.update(
      {
        id: updateArchiveStatus.id,
      },
      task,
    );
  }

  async moveTask(updateColumnStatusInput: UpdateColumnStatusInput) {
    const task = this.taskEntityRepository.create({
      status: updateColumnStatusInput.status,
    });

    await this.taskEntityRepository.update(
      {
        id: updateColumnStatusInput.id,
      },
      task,
    );
  }
}
