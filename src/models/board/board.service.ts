import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/models/board/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService implements OnModuleInit {
  constructor(
    @InjectRepository(BoardEntity)
    private boardEntityRepository: Repository<BoardEntity>,
  ) {}

  async onModuleInit() {
    const [dbBoard, dbBoard2] = await this.boardEntityRepository.find();

    if (!dbBoard) {
      const boardEntity = this.boardEntityRepository.create({
        name: 'board',
      });
      await this.boardEntityRepository.save(boardEntity);
    }

    if (!dbBoard2) {
      const boardEntity = this.boardEntityRepository.create({
        name: 'board2',
      });
      await this.boardEntityRepository.save(boardEntity);
    }
  }
}
