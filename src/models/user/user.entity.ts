import { IsString } from 'class-validator';
import { BoardEntity } from 'src/models/board/board.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  // Bad practice, never store the password as plain text.
  @Column()
  @IsString()
  password: string;

  @ManyToMany(() => BoardEntity, (board) => board.users)
  @JoinTable()
  boards: BoardEntity[];
}
