import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/service/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;

  // ------------------- MOCKS -------------------

  const mockUserDoc = {
    _id: new Types.ObjectId(),
    id: 1,
    nome: 'Victor',
    email: 'test@test.com',
    password: '123',
    save: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      toObject: () => ({ id: 1, email: 'test@test.com' }),
    }),
    toObject: jest.fn().mockReturnValue({ id: 1, email: 'test@test.com' }),
  };

  class MockUserModel {
    constructor(data: any) {
      Object.assign(this, data);
    }

    save = mockUserDoc.save;

    static findOne = jest.fn();
    static find = jest.fn();
    static findById = jest.fn();
    static findByIdAndUpdate = jest.fn();
    static findByIdAndDelete = jest.fn();
  }

  const mockCounterModel = {
    findOneAndUpdate: jest.fn(),
  };

  // ------------------- SETUP -------------------

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: MockUserModel,
        },
        { provide: getModelToken('Task'), useValue: {} },
        { provide: getModelToken('Counter'), useValue: mockCounterModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  // ------------------- TESTES -------------------

  it('service deve estar definido', () => {
    expect(service).toBeDefined();
  });

  // CREATE -------------------

  it('deve impedir criação caso email exista', async () => {
    MockUserModel.findOne.mockResolvedValueOnce(mockUserDoc);

    await expect(
      service.create({ nome: 'Victor', email: 'test@test.com', password: '123' })
    ).rejects.toThrow(BadRequestException);
  });

  it('deve criar usuário com sucesso', async () => {
    MockUserModel.findOne.mockResolvedValueOnce(null);
    mockCounterModel.findOneAndUpdate.mockResolvedValueOnce({ seq: 1 });

    const result = await service.create({
      nome: 'Victor',
      email: 'test@test.com',
      password: '123',
    });

    expect(result).toEqual({ id: 1, email: 'test@test.com' });
  });

  // FIND ALL -------------------

  it('deve listar usuários', async () => {
    const users = [{ id: 1, email: 'test@test.com' }];

    MockUserModel.find.mockReturnValue({
      select: () => ({
        lean: () => ({ exec: () => users }),
      }),
    });

    const result = await service.findAll();
    expect(result).toEqual(users);
  });

  // FIND BY ID -------------------

  it('deve lançar erro para ID inválido', async () => {
    await expect(service.findById('invalid')).rejects.toThrow(BadRequestException);
  });

  it('deve lançar erro se usuário não existir', async () => {
    MockUserModel.findById.mockReturnValueOnce({
      select: () => ({ lean: () => ({ exec: () => null }) }),
    });

    const id = new Types.ObjectId().toString();
    await expect(service.findById(id)).rejects.toThrow(NotFoundException);
  });

  it('deve retornar usuário válido', async () => {
    MockUserModel.findById.mockReturnValueOnce({
      select: () => ({ lean: () => ({ exec: () => mockUserDoc }) }),
    });

    const id = new Types.ObjectId().toString();
    const result = await service.findById(id);

    expect(result).toBe(mockUserDoc);
  });

  // UPDATE -------------------

  it('deve atualizar usuário', async () => {
    const updatedUser = { nome: 'Atualizado' };

    MockUserModel.findByIdAndUpdate.mockReturnValueOnce({
      select: () => ({ exec: () => updatedUser }),
    });

    const id = new Types.ObjectId().toString();
    const result = await service.update(id, updatedUser);

    expect(result).toBe(updatedUser);
  });

  it('deve lançar erro ao tentar atualizar usuário inexistente', async () => {
    MockUserModel.findByIdAndUpdate.mockReturnValueOnce({
      select: () => ({ exec: () => null }),
    });

    const id = new Types.ObjectId().toString();
    await expect(service.update(id, {})).rejects.toThrow(NotFoundException);
  });

  // DELETE -------------------

  it('deve remover usuário', async () => {
    MockUserModel.findByIdAndDelete.mockReturnValueOnce({
      exec: () => mockUserDoc,
    });

    const id = new Types.ObjectId().toString();
    await expect(service.remove(id)).resolves.not.toThrow();
  });

  it('deve lançar erro ao tentar remover usuário inexistente', async () => {
    MockUserModel.findByIdAndDelete.mockReturnValueOnce({
      exec: () => null,
    });

    const id = new Types.ObjectId().toString();
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });
});
