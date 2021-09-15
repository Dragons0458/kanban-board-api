import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/enums/status';
import { BoardEntity } from 'src/models/board/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  scrumPunctuation: number;

  @Column({
    default: false,
  })
  @IsBoolean()
  isArchived: boolean;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TO_DO,
  })
  status: Status;

  @Column({
    name: 'board_id',
  })
  boardId: number;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;
}
