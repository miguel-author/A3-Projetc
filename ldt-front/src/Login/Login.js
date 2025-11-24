import api from "../config/axiosConfig";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Salva token no navegador
      localStorage.setItem("token", response.data.access_token);

      alert("Login realizado com sucesso!");
      window.location.href = "/LDT"; // página principal após login
    } catch (error) {
      alert("Erro ao fazer login. Verifique email e senha!");
      console.error(error);
    }
  }

  return (
    <div className="todo-card">
      <h2>Login</h2>

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

        <button type="submit">Entrar</button>
      </form>

      <a className="register-link" href="/cadastro">Criar conta</a>
    </div>
  );
}
