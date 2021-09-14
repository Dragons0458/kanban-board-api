import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/models/board/board.entity';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
