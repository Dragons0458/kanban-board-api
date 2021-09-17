import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { BoardEntity } from 'src/models/board/board.entity';
import { TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';

function mockEntityFactory() {
  return {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };
}

describe('AppService', () => {
  const repositoryTaskMock = mockEntityFactory();
  const repositoryUserMock = mockEntityFactory();
  const repositoryBoardMock = mockEntityFactory();

  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: repositoryTaskMock,
        },
        {
          provide: getRepositoryToken(BoardEntity),
          useValue: repositoryBoardMock,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryUserMock,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('checks onModuleInit method', async () => {
    expect.assertions(6);
    repositoryTaskMock.find.mockClear();
    repositoryUserMock.find.mockClear();
    repositoryBoardMock.find.mockClear();

    repositoryTaskMock.find.mockResolvedValue([]);
    repositoryUserMock.find.mockResolvedValue([]);

    await service.onModuleInit();

    expect(repositoryTaskMock.create).toBeCalledTimes(4);
    expect(repositoryTaskMock.save).toBeCalledTimes(4);

    expect(repositoryUserMock.create).toBeCalledTimes(2);
    expect(repositoryUserMock.save).toBeCalledTimes(2);

    expect(repositoryBoardMock.create).toBeCalledTimes(2);
    expect(repositoryBoardMock.save).toBeCalledTimes(2);
  });
});
