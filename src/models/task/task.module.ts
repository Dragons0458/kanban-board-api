import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/models/task/task.entity';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
