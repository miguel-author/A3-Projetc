import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Cadastro = () => {
    
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // funcionara para quando for necessário autorização
            // const token = localStorage.getItem("token");
            // Configura os headers para a requisição com o token
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // };
            // await axios.post('http://localhost:3001/users', config, {
            //     nome, email, password
            // });

            await axios.post('http://localhost:3001/users', {
                nome, email, password
            });
            console.log('Usuário cadastrado com sucesso');
            toast.success('Usuário cadastrado com sucesso');
            setTimeout(() => {window.location.replace('http://localhost:3000/')}, 3000)
        } catch (error) {
            console.log('Não foi possivel cadastrar novo usuário',error)
            toast.error('Não foi possivel cadastrar novo usuário')
        }
    };


    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <h2>Cadastro</h2>
                <div>
                    <label>Nome: </label>
                    <input
                        type="nome"
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
                
                <button type="submit">Cadastro</button>
            </form>
        </div>
    );
    {mensagem && alert(mensagem)}
};

export default Cadastro;