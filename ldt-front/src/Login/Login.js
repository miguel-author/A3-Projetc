import api from "../config/axiosConfig";
import { useState } from "react";

// Página responsável por autenticação do usuário (login)
export default function Login() {

  // Estados controlados para armazenar os valores digitados no formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Função executada ao enviar o formulário.
   * Realiza chamada ao backend, valida credenciais
   * e salva o token JWT no navegador.
   */
  async function handleLogin(e) {
    e.preventDefault(); // evita recarregar a página

    try {
      // Envia requisição ao backend com email e senha
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Salva o token no localStorage para autenticação futura
      localStorage.setItem("token", response.data.access_token);

      alert("Login realizado com sucesso!");

      // Redireciona usuário para página protegida (lista de tarefas)
      window.location.href = "/LDT";
    } catch (error) {
      alert("Erro ao fazer login. Verifique email e senha!");
      console.error(error);
    }
  }

  return (
    <div className="todo-card">
      <h2>Login</h2>

      {/* Formulário com campos controlados */}
      <form className="form-column" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botão dispara o submit */}
        <button type="submit">Entrar</button>
      </form>

      {/* Link para redirecionar o usuário à página de cadastro */}
      <a className="register-link" href="/cadastro">Criar conta</a>
    </div>
  );
}
