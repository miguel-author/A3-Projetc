import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../src/auth/auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  // ----------------------
  // Caso 1 -> Token válido
  // ----------------------
  it('deve retornar o usuário se ele existir', () => {
    const user = { id: '123', email: 'test@test.com' };

    const result = guard.handleRequest(null, user);

    expect(result).toBe(user);
  });

  // ----------------------
  // Caso 2 -> Token inválido
  // ----------------------
  it('deve lançar erro se o usuário não existir', () => {
    expect(() => guard.handleRequest(null, null)).toThrow(UnauthorizedException);
  });

  // ----------------------
  // Caso 3 -> Erro da strategy
  // ----------------------
  it('deve lançar erro quando houver erro no JWT', () => {
    expect(() => guard.handleRequest(new Error('Token inválido'), null)).toThrow(
      UnauthorizedException,
    );
  });
});
