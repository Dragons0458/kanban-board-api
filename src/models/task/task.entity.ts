import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/enums/status';
import { BoardEntity } from 'src/models/board/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @IsBoolean()
  isArchived: boolean;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TO_DO,
  })
  status: Status;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  board: BoardEntity;
}
