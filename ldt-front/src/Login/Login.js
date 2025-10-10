import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {

    const[email, setEmail] = useState(' ');
    const[password, setPassword] = useState(' ');

    const handleLogin = async(e) =>{
        e.preventDefault();

        if (!email || !password) {
            toast.error('Preencha todos os campos');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/login', { 
                email,password
            });
            const meutoken = response.data.access_token; 
            console.log("batata frita", response, " meu token ", meutoken)
            if(meutoken ){ 
                setMensagem('Login realizado com sucesso')
                console.log("batata frita", meutoken)
                localStorage.setItem("token", meutoken); 

                toast.success('Login efetuado com sucesso');
                console.log('Login efetuado com sucesso');
                setTimeout(() => {window.location.replace('http://localhost:3000/listadetarefas')},2000);
            } else {
                setMensagem('Dados inválidos')
            }
        }catch (error) {
            console.error('Erro ao fazer login!', error);
            toast.error('Não foi possivel efetuar o Login');
        }
    };



    return(
        <div className="container">
            <form  onSubmit={handleLogin}>
            <h2 className="login">Login</h2>
                <div>
                    <label>Email: </label>
                    <input 
                    type = "email" 
                    value = {email} 
                    onChange = {(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Senha: </label>
                    <input 
                    type = "password" 
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)}/>
                </div>
            <button type = "submit" >Login</button>
            
                <div className="proxPg">
                <span> Ainda não tem cadastro? <a className="cliqueAqui" href="/cadastro">Clique Aqui!</a> </span>
                </div>
            
            </form>
         
        </div>

    );
};

export default LoginPage;