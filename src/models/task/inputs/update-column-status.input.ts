import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { BoardIdInput } from 'src/models/task/inputs/board-id.input';
import { TaskEntity } from 'src/models/task/task.entity';

export class UpdateColumnStatusInput extends IntersectionType(
  PickType(TaskEntity, ['status', 'id'] as const),
  BoardIdInput,
) {}
