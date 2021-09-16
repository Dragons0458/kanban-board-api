import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoginInput } from 'src/inputs/login.input';
import { UserEntity } from 'src/models/user/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  const repositoryMock = {
    findOne: jest.fn(),
  };

  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('checks that findOneByLoginInput method runs', () => {
    const loginInput: LoginInput = {
      username: 'hello',
      password: 'password',
    };

    let result: Promise<UserEntity | undefined>;

    beforeEach(() => {
      repositoryMock.findOne.mockReset();
      repositoryMock.findOne.mockResolvedValue(loginInput);
      result = service.findOneByLoginInput(loginInput);
    });

    it('checks that the findOne method was called with correct params', () => {
      expect(repositoryMock.findOne).toBeCalledWith({
        where: loginInput,
      });
    });

    it('checks that the method returns the correct value', () => {
      expect(result).resolves.toEqual(loginInput);
    });
  });

  describe('checks that userHasPermission method runs', () => {
    beforeEach(() => {
      repositoryMock.findOne.mockReset();
    });

    it('checks that the userHasPermission method was called with correct params', () => {
      service.userHasPermission(1, 1);

      expect(repositoryMock.findOne).toBeCalledWith({
        relations: ['boards'],
        where: {
          id: 1,
        },
      });
    });

    it('checks that the method return true with correct board', () => {
      repositoryMock.findOne.mockResolvedValue({
        id: 1,
        boards: [{ id: 1 }, { id: 2 }],
      });
      const result = service.userHasPermission(1, 1);

      expect(result).resolves.toStrictEqual(true);
    });

    it('checks that the method return false with incorrect board', () => {
      repositoryMock.findOne.mockResolvedValue({
        id: 1,
        boards: [{ id: 1 }, { id: 2 }],
      });
      const result = service.userHasPermission(1, 3);

      expect(result).resolves.toStrictEqual(false);
    });
  });
});
