import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../service/service";

export default function LDT() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      alert("Erro ao carregar tarefas");
      console.log(err);
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    await deleteTask(id);
    loadTasks();
  }

  async function toggleStatus(task) {
    const newStatus = task.status === "concluída" ? "pendente" : "concluída";
    await updateTask(task._id, { status: newStatus });
    loadTasks();
  }

  return (
    <div className="todo-card">
      <h2>Minhas Tarefas</h2>

      <div className="todo-list">
        {tasks.map((t) => (
          <div
            key={t._id}
            className={`todo-item ${t.status === "concluída" ? "done" : ""}`}
            onClick={() => toggleStatus(t)}
          >
            <span>{t.title}</span>

            <button className="delete-btn" onClick={(e) => handleDelete(t._id, e)}>
              ✖
            </button>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={() => window.location.href = "/novaTarefa"}>
        Nova tarefa
      </button>
    </div>
  );
}
