import api from "../config/axiosConfig";
import { useState } from "react";

// Página responsável pelo cadastro de novos usuários
export default function Cadastro() {

  // Estados controlados para armazenar os valores digitados pelo usuário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Executado quando o formulário é enviado.
   * Faz requisição ao backend para criar uma nova conta.
   */
  async function handleRegister(e) {
    e.preventDefault(); // impede reload automático do form

    try {
      // Envia os dados do formulário para a API
      await api.post("/auth/register", {
        nome,
        email,
        password,
      });

      alert("Cadastro realizado com sucesso!");

      // Após cadastrar, redireciona o usuário para tela de login
      window.location.href = "/login";
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
      console.error(error.response?.data || error);
    }
  }

  return (
    <div className="todo-card">
      <h2>Cadastro</h2>

      {/* Formulário com inputs controlados */}
      <form className="form-column" onSubmit={handleRegister}>
        
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        {/* Botão finaliza o envio do formulário */}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
