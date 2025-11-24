import api from "../config/axiosConfig";
import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        password,
      });

      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login"; 
    } catch (error) {
      alert("Erro ao cadastrar usuário!");
      console.error(error.response?.data || error);
    }
  }

  return (
     <div className="todo-card">
      <h2>Cadastro</h2>

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

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
