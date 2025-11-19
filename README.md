📌 Task API — Backend com NestJS + MongoDB + JWT

API para gerenciamento de usuários e tarefas construída com NestJS, Mongoose, JWT Authentication, Swagger e Clean Architecture.

🚀 Funcionalidades

🧑‍💼 Cadastro de usuário

🔐 Login autenticado com JWT

📝 Criação, edição e remoção de tarefas

🔄 Relação 1 usuário → muitas tarefas

🧰 Validações automáticas (DTO + ValidationPipe)

📘 Documentação via Swagger

🗂 Banco de dados MongoDB


🛠 Tecnologias Utilizadas
Categoria	             Tecnologia
Backend Framework	       NestJS
Banco de Dados	       MongoDB (Mongoose)
Autenticação	        Passport + JWT
Segurança	               Bcrypt
Documentação	           Swagger
Validação	            class-validator

📦 Instalação

Clone o repositório:

git clone https://github.com/seu-repo/task-api.git


Instale as dependências:

npm install


Crie um arquivo .env baseado no .env.example:

cp .env.example .env


Configure MONGO_URI, JWT_SECRET e demais valores.

▶️ Rodando o Projeto

Modo desenvolvimento:

npm run start:dev


Modo produção:

npm run build && npm start

🔍 Documentação (Swagger)

Após rodar o servidor, acesse:

👉 http://localhost:3001/api/docs

🔐 Rotas de Autenticação
🔑 POST /auth/register

Cria um usuário.

JSON Body:
{
  "nome": "Victor",
  "email": "victor@email.com",
  "password": "senha123"
}

🔑 POST /auth/login
{
  "email": "admin@email.com",
  "password": "senha123"
}


Resposta:

{
  "access_token": "jwt_token_aqui"
}


Guarde este token.
Ele deve ser enviado em rotas protegidas:

Authorization: Bearer <token>

📝 Rotas de Usuário
Método	     Rota	    Protegida
GET	        /users	       ❌
GET	      /users/:id	   ❌
PUT	      /users/:id	   ❌
DELETE	  /users/:id	   ❌


📌 Rotas de Tarefas
Método	Rota	Protegida
POST	/tasks	✔
GET	/tasks	✔
GET	/tasks/:id	✔
PUT	/tasks/:id	✔
DELETE	/tasks/:id	✔
Exemplo JSON para criar tarefa:
{
  "title": "Estudar NestJS",
  "description": "Finalizar módulo de MongoDB",
  "status": "pendente",
  "expirationDate": "2025-12-31",
  "userId": "64e87bd76f2844fe4e37d1db"
}

🗄 Conexão com MongoDB Atlas (opcional)

No .env, coloque:

MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net
DB_NAME=taskapi

🛡 Segurança

Senhas são armazenadas com bcrypt

JWT expirável configurado no .env

Rotas protegidas usam JwtAuthGuard

☑ To-do Futuro (opcional)

Reset de senha

Refresh Token

Upload de arquivos

Logs auditáveis

Testes unitários (Jest)

