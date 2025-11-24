import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Se não tiver token → vai para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver token → permite acessar rota
  return children;
}
