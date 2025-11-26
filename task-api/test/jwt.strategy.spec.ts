import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  const mockUserModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => jest.clearAllMocks());

  // ------------------------------
  // TESTE: usuário encontrado
  // ------------------------------
  it('deve retornar dados do usuário se o token for válido', async () => {
    const payload = { sub: new Types.ObjectId().toString(), email: 'test@test.com' };

    const mockUserDoc = {
      _id: payload.sub,
      email: payload.email,
      toObject: jest.fn().mockReturnValue({ id: payload.sub, email: payload.email }),
    };

    mockUserModel.findById.mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({ exec: () => mockUserDoc }),
    });

    const result = await strategy.validate(payload);

    expect(mockUserModel.findById).toHaveBeenCalledWith(payload.sub);
    expect(result).toEqual({ userId: payload.sub, email: payload.email });
  });

  // ------------------------------
  // TESTE: usuário inexistente
  // ------------------------------
  it('deve lançar erro se o usuário não existir', async () => {
    const payload = { sub: new Types.ObjectId().toString(), email: 'notfound@test.com' };

    mockUserModel.findById.mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({ exec: () => null }),
    });

    await expect(strategy.validate(payload)).rejects.toThrow(UnauthorizedException);
  });
});
