import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { CreateTaskInput } from 'src/models/task/inputs/create-task.input';
import { UpdateArchiveStatusInput } from 'src/models/task/inputs/update-archive-status.input';
import { UpdateColumnStatusInput } from 'src/models/task/inputs/update-column-status.input';
import { TaskBoardGuard } from 'src/models/task/task-board.guard';
import { TaskEntity } from 'src/models/task/task.entity';
import { TaskService } from 'src/models/task/task.service';

@UseGuards(TaskBoardGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':boardId')
  async getAll(@Param() boardIdInput: BoardIdInput): Promise<TaskEntity[]> {
    return this.taskService.getAll(boardIdInput);
  }

  @Post()
  async create(@Body() createTaskInput: CreateTaskInput) {
    await this.taskService.create(createTaskInput);
  }

  @Put('archiveStatus')
  async updateArchiveStatus(
    @Body() updateArchiveStatusInput: UpdateArchiveStatusInput,
  ) {
    await this.taskService.archive(updateArchiveStatusInput);
  }

  @Put('moveTask')
  async moveTask(@Body() updateColumnStatusInput: UpdateColumnStatusInput) {
    await this.taskService.moveTask(updateColumnStatusInput);
  }
}
