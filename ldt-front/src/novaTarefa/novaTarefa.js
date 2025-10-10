import React, { useState } from "react";
import instance from "../config/axiosConfig";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; // Se usar React Router
import './novaTarefa.css';

const NovaTarefa = () => {
    // const navigate = useNavigate(); // Se usar React Router

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const createTask = async (e) => {
        e.preventDefault();

        if (!title || !description || !expirationDate) {
            toast.error('Preencha todos os campos');
            return;
        }

        try {
            await instance.post('/task', {
                title,
                description,
                expirationDate,
                status: 'TO_DO'
            });
            toast.success('Task criada com sucesso');
            // Redirecionar para lista de tarefas
            // navigate('/listadetarefas'); // Se usar React Router
        } catch (error) {
            console.log('Não foi possível criar a task');
            toast.error('Não foi possível criar a task');
        }
    };

    return (
        <div className="todo-container">
            <form id="todo-form" className="form" onSubmit={createTask}>
                <p className="createTask">Crie sua tarefa</p>
                <div className="novaTarefa">
                    <h3>Título: </h3>
                    <div className="title">
                        <input
                            className="caixa"
                            type="text"
                            value={title}
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
                    <h3>Data de expiração: </h3>
                    <div className="expirationDate">
                        <input
                            className="caixa"
                            type="date"
                            value={expirationDate}
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
};

export default NovaTarefa;