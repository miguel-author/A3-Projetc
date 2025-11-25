import api from "../config/axiosConfig";
// A instância "api" já contém configurações como baseURL e headers (ex.: token JWT).

/**
 * Busca todas as tarefas do usuário autenticado.
 */
export async function getTasks() {
  // GET → /tasks
  const response = await api.get("/tasks");
  return response.data; // retorna apenas os dados úteis da resposta
}

/**
 * Cria uma nova tarefa associada ao usuário logado.
 * @param {Object} task - dados enviados pelo formulário
 */
export async function createTask(task) {
  // POST → /tasks enviando o objeto da task no corpo da requisição
  const response = await api.post("/tasks", task);
  return response.data;
}

/**
 * Remove uma tarefa pelo ID
 * @param {string} id - ID da tarefa no banco
 */
export async function deleteTask(id) {
  // DELETE → /tasks/:id
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

/**
 * Atualiza uma tarefa existente
 * @param {string} id - ID da tarefa
 * @param {Object} updatedData - campos a serem alterados
 */
export async function updateTask(id, updatedData) {
  // PUT → /tasks/:id enviando apenas campos alterados
  const response = await api.put(`/tasks/${id}`, updatedData);
  return response.data;
}
