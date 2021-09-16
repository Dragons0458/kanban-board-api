import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from 'src/models/task/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  const repositoryMock = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('checks onModuleInit method', async () => {
    expect.assertions(2);
    repositoryMock.find.mockClear();
    repositoryMock.find.mockResolvedValue([]);
    await service.onModuleInit();

    expect(repositoryMock.create).toBeCalledTimes(4);
    expect(repositoryMock.save).toBeCalledTimes(4);
  });
});
