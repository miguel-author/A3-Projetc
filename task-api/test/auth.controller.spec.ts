import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve chamar login() corretamente', async () => {
    const dto = { email: 'test@test.com', password: '123' };
    const mockUser = { id: '1' };
    const token = { access_token: 'jwt' };

    mockAuthService.validateUser.mockResolvedValueOnce(mockUser);
    mockAuthService.login.mockResolvedValueOnce(token);

    const result = await controller.login(dto);

    expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    expect(service.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(token);
  });

  it('deve chamar register() corretamente', async () => {
    const dto = { nome: 'Teste', email: 'test@test.com', password: '123' };
    const mockResponse = { id: '1', email: dto.email };

    mockAuthService.register.mockResolvedValueOnce(mockResponse);

    const result = await controller.register(dto);

    expect(service.register).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResponse);
  });
});
