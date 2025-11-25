import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../service/service";

// Página responsável por listar, atualizar status e excluir tarefas
export default function LDT() {

  // Estado que armazena a lista de tarefas carregadas do backend
  const [tasks, setTasks] = useState([]);

  // Executa apenas uma vez ao carregar a página
  useEffect(() => {
    loadTasks(); // busca tarefas do servidor
  }, []);

  /**
   * Função responsável por buscar tarefas no backend
   * e atualizar o estado interno da aplicação
   */
  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data); // atualiza tela
    } catch (err) {
      alert("Erro ao carregar tarefas");
      console.log(err);
    }
  }

  /**
   * Exclui uma tarefa pelo ID
   * @param {string} id
   * @param {event} e
   */
  async function handleDelete(id, e) {
    e.stopPropagation(); 
    // evita que o clique também execute o toggle de status

    await deleteTask(id);
    loadTasks(); // atualiza lista após exclusão
  }

  /**
   * Alterna status entre "pendente" e "concluída"
   * @param {Object} task
   */
  async function toggleStatus(task) {
    // alterna status
    const newStatus = task.status === "concluída" ? "pendente" : "concluída";

    // atualiza tarefa no backend
    await updateTask(task._id, { status: newStatus });

    // recarrega lista atualizada
    loadTasks();
  }

  return (
    <div className="todo-card">
      <h2>Minhas Tarefas</h2>

      {/* Renderiza lista de tarefas */}
      <div className="todo-list">
        {tasks.map((t) => (
          <div
            key={t._id}
            className={`todo-item ${t.status === "concluída" ? "done" : ""}`}
            onClick={() => toggleStatus(t)} // altera status ao clicar
          >
            <span>{t.title}</span>

            {/* Botão para excluir tarefa */}
            <button className="delete-btn" onClick={(e) => handleDelete(t._id, e)}>
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Botão para adicionar nova tarefa */}
      <button className="add-btn" onClick={() => window.location.href = "/novaTarefa"}>
        Nova tarefa
      </button>
    </div>
  );
}
