import React, { useState } from "react"
import axios from "axios";
import './novaTarefa.css';
import instance from "../config/axiosConfig";
import { toast } from "react-toastify";

const NovaTarefa = () => {

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[status, setStatus] = useState('');
    const[expirationDate, setExpirationDate] = useState('');
    const [mensagem, setMensagem] = useState(' ');
  
    const createTask = async (e) => {
        e.preventDefault();

    try{

        await instance.post('/task',{
            title, description, expirationDate, status:'TO_DO'
        });
        toast.success('Task criada com sucesso');
        console.log('Task criada com sucesso')
        setTimeout(() => {window.location.replace('http://localhost:3000/listadetarefas')}, 3000)
    }catch (error){
        console.log('Não foi possivel criar a task');
        toast.error('Não foi possivel criar a task');
    }
        
    }




    return( 
<div class="todo-container">

<form id="todo-form" className="form" onSubmit={createTask}>
    <p className="createTask">Crie sua tarefa</p>
    <div className="novaTarefa">

    <h3>Titulo: </h3>
    <div class="title">
        <input
        className="caixa"
        type="text"
        value = {title}
        placeholder="O que você vai fazer?"
        onChange={(e) => setTitle(e.target.value)}
        />
    </div>
    <h3>Descrição: </h3>
    <div className="descricao">
        <input
        className="caixa"
        type="text"
        value={description}
        placeholder="Descrição da tarefa"
        onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    {/* <h3>Status: </h3>
    <div className="status">
        <input
        className="caixa"
        type="text"
        value={status}
        placeholder="IN_PROGRESS | TO_DO"
        onChange={(e) => setStatus(e.target.value)}
        />
    </div> */}
    <h3>Data de expiração: </h3>
    <div className="expirationDate">
        <input
        className="caixa"
        type="date"
        value={expirationDate}
        placeholder="2024-06-13"
        onChange={(e) => setExpirationDate(e.target.value)}
        />
    </div>
        </div>
        <button type="submit" className="botao">
        OK
        </button>
</form>
        </div>
);
}
export default NovaTarefa;