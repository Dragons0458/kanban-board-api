import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class BoardIdInput {
  @IsInt()
  @Type(() => Number)
  boardId: number;
}
