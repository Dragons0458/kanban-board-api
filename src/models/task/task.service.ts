import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { CreateTaskInput } from 'src/models/task/inputs/create-task.input';
import { UpdateArchiveStatusInput } from 'src/models/task/inputs/update-archive-status.input';
import { UpdateColumnStatusInput } from 'src/models/task/inputs/update-column-status.input';
import { TaskEntity } from 'src/models/task/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskEntityRepository: Repository<TaskEntity>,
  ) {}

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
