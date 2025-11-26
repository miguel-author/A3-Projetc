import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

jest.mock('bcrypt');

// Tipo auxiliar para evitar erro do UserDocument
type MockUserDoc = {
  _id: any;
  email: string;
  password: string;
  save: jest.Mock;
  toObject: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('fake.jwt.token'),
  };

  const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
  };

  const mockUserDoc: MockUserDoc = {
    _id: new Types.ObjectId(),
    email: 'test@test.com',
    password: 'hashedpass',
    save: jest.fn(),
    toObject: jest.fn().mockReturnValue({ id: '1', email: 'test@test.com' }),
  };

  // Simula new this.userModel() do mongoose
  class MockUserConstructor {
    email: string;
    password: string;
    save = jest.fn().mockResolvedValue(mockUserDoc);

    constructor(data: any) {
      Object.assign(this, data);
    }

    toObject() {
      return mockUserDoc.toObject();
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getModelToken('User'),
          useValue: Object.assign(MockUserConstructor, mockUserModel), 
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  // -----------------------------
  // validateUser()
  // -----------------------------

  it('deve lançar erro se o usuário não existir', async () => {
    mockUserModel.findOne.mockReturnValueOnce({ exec: () => null });

    await expect(service.validateUser('email', 'pass')).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar erro se a senha estiver errada', async () => {
    mockUserModel.findOne.mockReturnValueOnce({ exec: () => mockUserDoc });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(service.validateUser('email', 'pass')).rejects.toThrow(UnauthorizedException);
  });

  it('deve validar usuário com sucesso', async () => {
    mockUserModel.findOne.mockReturnValueOnce({ exec: () => mockUserDoc });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const result = await service.validateUser('email', 'pass');

    expect(result).toBe(mockUserDoc);
  });

  // -----------------------------
  // login()
  // -----------------------------

  it('deve gerar token', async () => {
    const result = await service.login(mockUserDoc as unknown as any);

    expect(mockJwtService.sign).toHaveBeenCalled();
    expect(result).toEqual({ access_token: 'fake.jwt.token' });
  });

  // -----------------------------
  // register()
  // -----------------------------

  it('deve lançar erro se faltar senha', async () => {
    await expect(service.register({ email: 'test@test.com' }))
      .rejects.toThrow(BadRequestException);
  });

  it('deve lançar erro se faltar email', async () => {
    await expect(service.register({ password: '123' }))
      .rejects.toThrow(BadRequestException);
  });

  it('deve impedir registro de email já existente', async () => {
    mockUserModel.findOne.mockReturnValueOnce({ exec: () => mockUserDoc });

    await expect(service.register({ email: 'test@test.com', password: '123' }))
      .rejects.toThrow(UnauthorizedException);
  });

  it('deve registrar usuário com sucesso', async () => {
    mockUserModel.findOne.mockReturnValueOnce({ exec: () => null });

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashed');

    const result = await service.register({ email: 'test@test.com', password: '123' });

    expect(result).toEqual({ id: '1', email: 'test@test.com' });
  });
});
