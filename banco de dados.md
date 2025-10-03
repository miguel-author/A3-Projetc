-- Criação do Banco de Dados
CREATE DATABASE MeuBancoDeDados;

-- Uso do Banco de Dados
USE MeuBancoDeDados;

-- Criação da Tabela login
CREATE TABLE login (
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    PRIMARY KEY (email)
);

-- Criação da Tabela tasks
CREATE TABLE tasks (
    ID INT AUTO_INCREMENT,
    TITULO VARCHAR(255) NOT NULL,
    DESCRICAO TEXT,
    EXPIRATIONDATE DATE,
    STATUS ENUM('TO_DO', 'DONE', 'IN_PROGRESS') DEFAULT 'TO_DO',
    PRIMARY KEY (ID)
);