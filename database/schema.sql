
/*
 * Cria o banco de dados caso ele ainda não exista.
 */
CREATE DATABASE IF NOT EXISTS sistema_academico
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

/*
 * Seleciona o banco que será utilizado.
 */
USE sistema_academico;

/*
 * Cria a tabela de alunos.
 */
CREATE TABLE IF NOT EXISTS alunos (

    /*
     * Identificador numérico gerado automaticamente.
     */
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,

    /*
     * Registro Acadêmico.
     * UNIQUE impede a repetição do RA.
     */
    ra VARCHAR(20) NOT NULL UNIQUE,

    /*
     * Dados do aluno.
     */
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    turma VARCHAR(50) NOT NULL,

    /*
     * Situação do aluno.
     */
    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    /*
     * Datas de criação e atualização.
     */
    criado_em TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    atualizado_em TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    /*
     * Define o ID como chave primária.
     */
    PRIMARY KEY (id)
);
