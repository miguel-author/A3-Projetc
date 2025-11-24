import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/cadastro";
import LDT from "./LDT/ldt";
import NovaTarefa from "./novaTarefa/novaTarefa";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas */}
        <Route
          path="/LDT"
          element={
            <ProtectedRoute>
              <LDT />
            </ProtectedRoute>
          }
        />

        <Route
          path="/novaTarefa"
          element={
            <ProtectedRoute>
              <NovaTarefa />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
