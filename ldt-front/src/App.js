import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/cadastro";
import LDT from "./LDT/ldt";
import NovaTarefa from "./novaTarefa/novaTarefa";
import ProtectedRoute from "./components/ProtectedRoute";

// Componente principal de navegação da aplicação
export default function App() {
  return (
    <BrowserRouter>
      {/* Container responsável pelas rotas da aplicação */}
      <Routes>

        {/* Rotas públicas — não exigem autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas — exigem token/autenticação */}
        <Route
          path="/LDT"
          element={
            <ProtectedRoute>
              {/* Se autenticado, renderiza a página de listagem */}
              <LDT />
            </ProtectedRoute>
          }
        />

        <Route
          path="/novaTarefa"
          element={
            <ProtectedRoute>
              {/* Página para criação de nova tarefa (somente usuários autenticados) */}
              <NovaTarefa />
            </ProtectedRoute>
          }
        />

        {/* Rota fallback caso usuário tente acessar rota inexistente */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
