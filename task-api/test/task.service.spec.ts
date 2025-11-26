import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../src/users/service/task.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

// Criando mocks dos modelos do Mongoose
const generatedId = new Types.ObjectId();

const mockToObject = jest.fn();
const mockSave = jest.fn().mockReturnValue({
  _id: generatedId,
  toObject: mockToObject,
});

const MockTaskModel = jest.fn().mockImplementation((data) => ({
  ...data,
  _id: generatedId, 
  save: mockSave,
}));

const mockTaskModel = {
  findOneAndDelete: jest.fn(),
};

const mockUserModel = {
  findById: jest.fn(),
  updateOne: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,

        {
  provide: getModelToken('Task'),
  useValue: Object.assign(MockTaskModel, mockTaskModel),
},
{
  provide: getModelToken('User'),
  useValue: mockUserModel,
},
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===========================
  // TESTE 1: usuário inválido
  // ===========================
  it('deve lançar erro se userId for inválido', async () => {
    const dto = { title: 'Teste' };
    await expect(service.create('abc', dto)).rejects.toThrow(BadRequestException);
  });

  // ====================================
  // TESTE 2: usuário não encontrado
  // ====================================
  it('deve lançar erro se o usuário não existir', async () => {
    jest.spyOn(mockUserModel, 'findById').mockResolvedValueOnce(null);

    const validUserId = new Types.ObjectId().toString();
    const dto = { title: 'Teste' };

    await expect(service.create(validUserId, dto)).rejects.toThrow(NotFoundException);
  });

  // ====================================
  // TESTE 3: criar tarefa com sucesso
  // ====================================
  it('deve criar uma tarefa com sucesso', async () => {
    const validUserId = new Types.ObjectId().toString();
    const dto = { title: 'Nova Task' };

    jest.spyOn(mockUserModel, 'findById').mockResolvedValueOnce({ _id: validUserId });
    jest.spyOn(mockUserModel, 'updateOne').mockResolvedValueOnce(true);

    const savedTask = {
      ...dto,
      userId: validUserId,
      _id: generatedId,
    };

    mockToObject.mockReturnValueOnce(savedTask);

    const result = await service.create(validUserId, dto);

    expect(result).toEqual(savedTask);
    expect(MockTaskModel).toHaveBeenCalledWith({ ...dto, userId: validUserId });
    expect(mockSave).toHaveBeenCalled();
    expect(mockToObject).toHaveBeenCalledWith({ versionKey: false });
    expect(mockUserModel.updateOne).toHaveBeenCalledWith(
      { _id: validUserId },
      { $push: { tasksIds: generatedId.toString() } },
    );
  });

  // ===========================
  // TESTES DO DELETE
  // ===========================

  it('deve lançar erro se o ID for inválido', async () => {
    const userId = new Types.ObjectId().toString();
    await expect(service.remove('invalid', userId)).rejects.toThrow(BadRequestException);
  });

  it('deve lançar erro se a tarefa não existir ou não pertencer ao usuário', async () => {
    const taskId = new Types.ObjectId().toString();
    const userId = new Types.ObjectId().toString();

    jest.spyOn(mockTaskModel, 'findOneAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.remove(taskId, userId)).rejects.toThrow(NotFoundException);
  });

  it('deve remover uma tarefa com sucesso', async () => {
    const taskId = new Types.ObjectId().toString();
    const userId = new Types.ObjectId().toString();

    jest.spyOn(mockTaskModel, 'findOneAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: taskId }),
    } as any);

    await expect(service.remove(taskId, userId)).resolves.not.toThrow();

    expect(mockTaskModel.findOneAndDelete).toHaveBeenCalledWith({
      _id: taskId,
      userId,
    });
  });

});
