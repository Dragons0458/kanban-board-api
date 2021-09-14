import { IsString } from 'class-validator';
import { TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('boards')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks: TaskEntity[];

  @ManyToMany(() => UserEntity, (user) => user.boards)
  users: UserEntity[];
}
