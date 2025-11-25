import { useState } from "react";
import { createTask } from "../service/service";

// Página responsável por criar uma nova tarefa
export default function NovaTarefa() {

  // Hook de estado para armazenar o título digitado pelo usuário
  const [title, setTitle] = useState("");

  /**
   * Função chamada quando o formulário é enviado
   */
  async function handleSubmit(e) {
    e.preventDefault(); // evita reload da página

    try {
      // Faz a requisição ao backend enviando os dados da nova tarefa
      await createTask({
        title,
        description: "Criada via front", // texto padrão
        status: "pendente",
        expirationDate: new Date().toISOString().split("T")[0], // gera data no formato YYYY-MM-DD
      });

      alert("Tarefa criada com sucesso!");

      // Redireciona usuário para lista de tarefas
      window.location.href = "/LDT";

    } catch (err) {
      console.log(err);
      alert("Erro ao criar tarefa");
    }
  }

  return (
    <div className="todo-card">
      <h2>Nova Tarefa</h2>

      {/* Formulário que dispara handleSubmit ao enviar */}
      <form onSubmit={handleSubmit} className="form-row">
        
        {/* Campo controlado: valor vem do estado e atualiza via setState */}
        <input
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Botão responsável por enviar o formulário */}
        <button className="add-btn" type="submit">Criar</button>
      </form>
    </div>
  );
}
