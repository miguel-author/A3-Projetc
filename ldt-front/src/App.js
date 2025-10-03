import React from "react";
import './Login/Login.css';
import LoginPage from "./Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Cadastro/cadastro";
import Ldt from "./LDT/ldt";
import NovaTarefa from "./novaTarefa/novaTarefa";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path="/listadetarefas" element={<Ldt/>}/>
        <Route path="/nova-tarefa" element={<NovaTarefa/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;