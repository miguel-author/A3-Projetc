import api from "../config/axiosConfig";

export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data;
}

export async function createTask(task) {
  const response = await api.post("/tasks", task);
  return response.data;
}

export async function deleteTask(id) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

export async function updateTask(id, updatedData) {
  const response = await api.put(`/tasks/${id}`, updatedData);
  return response.data;
}
