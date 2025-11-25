import axios from "axios";

// Cria uma instância do Axios configurada para usar a API do backend
const api = axios.create({
  baseURL: "http://localhost:3001", // URL base onde o backend NestJS está rodando
});

// 🔐 Interceptor responsável por adicionar automaticamente o token JWT em cada requisição
api.interceptors.request.use((config) => {
  // Obtém o token armazenado no navegador
  const token = localStorage.getItem("token");

  // Se existir token, adiciona ao header Authorization no formato Bearer Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // retorna configuração final da requisição
});

export default api; // Exporta a instância configurada para ser usada no projeto
