import { Navigate } from "react-router-dom";

// Componente responsável por proteger rotas privadas.
// Ele verifica se o usuário possui token no navegador.
// Se não tiver → redireciona para login.
// Se tiver → permite acessar a rota normalmente.
export default function ProtectedRoute({ children }) {

  // Busca token salvo no localStorage (gerado após login bem-sucedido)
  const token = localStorage.getItem("token");

  // Caso o usuário tente acessar uma rota protegida sem estar autenticado
  if (!token) {
    // redireciona para /login usando <Navigate />
    return <Navigate to="/login" replace />;
  }

  // Se o token existir → renderiza o conteúdo protegido
  return children;
}
