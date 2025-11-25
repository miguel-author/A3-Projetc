import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Obtém o elemento HTML onde a aplicação React será renderizada
const rootElement = document.getElementById('root');

// Cria a raiz da aplicação utilizando o novo método recomendado pelo React 18
const root = ReactDOM.createRoot(rootElement);

// Renderiza a aplicação dentro do StrictMode
root.render(
  <React.StrictMode>
    {/* Componente principal da aplicação */}
    <App />

    {/* Componente responsável por exibir notificações (sucesso, erro etc.) */}
    <ToastContainer/>
  </React.StrictMode>
);
