import { useState } from "react";
import { createTask } from "../service/service";

export default function NovaTarefa() {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createTask({
        title,
        description: "Criada via front",
        status: "pendente",
        expirationDate: new Date().toISOString().split("T")[0],
      });

      alert("Tarefa criada com sucesso!");
      window.location.href = "/LDT";
    } catch (err) {
      console.log(err);
      alert("Erro ao criar tarefa");
    }
  }

  return (
    <div className="todo-card">
      <h2>Nova Tarefa</h2>

      <form onSubmit={handleSubmit} className="form-row">
        <input
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="add-btn" type="submit">Criar</button>
      </form>
    </div>
  );
}
