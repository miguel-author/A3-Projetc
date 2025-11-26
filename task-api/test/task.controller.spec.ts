import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../src/users/controller/task.controller';
import { TaskService } from '../src/users/service/task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  // Mock simulado do TaskService
  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockReq = {
    user: { userId: 'mockUserId' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => jest.clearAllMocks());

  // -------------------------
  // TESTE 1: CREATE()
  // -------------------------
  it('deve chamar service.create ao criar uma task', async () => {
    const dto = { title: 'Teste' };
    const expectedResponse = { id: '1', ...dto };

    mockTaskService.create.mockResolvedValueOnce(expectedResponse);

    const result = await controller.create(mockReq, dto);

    expect(service.create).toHaveBeenCalledWith(mockReq.user.userId, dto);
    expect(result).toEqual(expectedResponse);
  });

  // -------------------------
  // TESTE 2: findAll()
  // -------------------------
  it('deve retornar todas as tarefas do usuário', async () => {
    const mockTasks = [{ id: '1', title: 'Task A' }];

    mockTaskService.findAll.mockResolvedValueOnce(mockTasks);

    const result = await controller.findAll(mockReq);

    expect(service.findAll).toHaveBeenCalledWith(mockReq.user.userId);
    expect(result).toEqual(mockTasks);
  });

  // -------------------------
  // TESTE 3: findById()
  // -------------------------
  it('deve chamar findById com ID correto', async () => {
    const id = '123';
    const mockTask = { id, title: 'Test' };

    mockTaskService.findById.mockResolvedValueOnce(mockTask);

    const result = await controller.findById(mockReq, id);

    expect(service.findById).toHaveBeenCalledWith(id, mockReq.user.userId);
    expect(result).toEqual(mockTask);
  });

  // -------------------------
  // TESTE 4: update()
  // -------------------------
  it('deve atualizar uma task', async () => {
    const id = '123';
    const dto = { title: 'Atualizada' };
    const mockUpdatedTask = { id, ...dto };

    mockTaskService.update.mockResolvedValueOnce(mockUpdatedTask);

    const result = await controller.update(mockReq, id, dto);

    expect(service.update).toHaveBeenCalledWith(id, mockReq.user.userId, dto);
    expect(result).toEqual(mockUpdatedTask);
  });

  // -------------------------
  // TESTE 5: DELETE()
  // -------------------------
  it('deve chamar remove() com o usuário correto', async () => {
    const id = '321';
    mockTaskService.remove.mockResolvedValueOnce(undefined);

    await controller.remove(mockReq, id);

    expect(service.remove).toHaveBeenCalledWith(id, mockReq.user.userId);
  });

});
