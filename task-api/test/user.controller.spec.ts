import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/controller/users.controller';
import { UsersService } from '../src/users/service/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar create corretamente', async () => {
    const dto = { nome: 'Victor', email: 'test@test.com', password: '123' };
    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(dto);
  });

  it('deve listar usuários', async () => {
    mockService.findAll.mockResolvedValue(['user']);
    const result = await controller.findAll();

    expect(result).toEqual(['user']);
  });

  it('deve buscar usuário por ID', async () => {
    mockService.findById.mockResolvedValue('user');

    const result = await controller.findById('123');

    expect(service.findById).toHaveBeenCalledWith('123');
    expect(result).toBe('user');
  });

  it('deve atualizar usuário', async () => {
    const dto = { nome: 'Novo Nome' };
    mockService.update.mockResolvedValue(dto);

    const result = await controller.update('123', dto);

    expect(service.update).toHaveBeenCalledWith('123', dto);
    expect(result).toBe(dto);
  });

  it('deve remover usuário', async () => {
    mockService.remove.mockResolvedValue(true);

    const result = await controller.remove('123');

    expect(service.remove).toHaveBeenCalledWith('123');
    expect(result).toBe(true);
  });
});
