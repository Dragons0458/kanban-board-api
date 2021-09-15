import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { TaskEntity } from 'src/models/task/task.entity';

export class UpdateArchiveStatusInput extends IntersectionType(
  PickType(TaskEntity, ['isArchived', 'id'] as const),
  BoardIdInput,
) {}
