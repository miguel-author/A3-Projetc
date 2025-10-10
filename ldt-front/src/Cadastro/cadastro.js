import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Se estiver usando React Router, descomente abaixo
// import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    // const navigate = useNavigate(); // Se usar React Router

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');

    const validarEmail = (email) => {
        // Validação simples de email
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!nome || !email || !password) {
            toast.error('Por favor, preencha todos os campos');
            return;
        }

        if (!validarEmail(email)) {
            toast.error('Email inválido');
            return;
        }

        try {
            await axios.post('http://localhost:3001/users', {
                nome, email, password
            });
            toast.success('Usuário cadastrado com sucesso');
            // Redirecionar para login ou home
            // navigate('/login'); // Se usar React Router
        } catch (error) {
            toast.error('Não foi possível cadastrar novo usuário');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCadastro}>
                <h2>Cadastro</h2>
                <div>
                    <label>Nome: </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Senha: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;