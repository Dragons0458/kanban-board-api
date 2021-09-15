import { PickType, IntersectionType } from '@nestjs/mapped-types';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { TaskEntity } from 'src/models/task/task.entity';

export class CreateTaskInput extends IntersectionType(
  PickType(TaskEntity, [
    'description',
    'status',
    'scrumPunctuation',
    'title',
  ] as const),
  BoardIdInput,
) {}
