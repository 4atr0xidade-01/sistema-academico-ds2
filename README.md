# Sistema Acadêmico DS II

Projeto integrador da disciplina Desenvolvimento para Servidores II





## Objetivo

Desenvolver gradualmente uma aplicação web para cadastro de alunos,

disciplinas, usuários e lançamento de notas.

## Tecnologias previstas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- JWT
- Git e GitHub
## Estrutura

- frontend: interface da aplicação
- backend: API e regras do servidor
- database: scripts do banco de dados
- docs: documentação e evidências


## Dados do aluno

**Nome:** Davi de Sousa Oliveira  
**RA:** 2650832423026  
**Turma:** SI 5

## Como executar o projeto

Para executar o sistema, é necessário ter o Node.js instalado e o VS Code com a extensão Live Server.

### Backend

Abra o terminal na pasta do projeto e execute:

```bash
cd backend
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

### Frontend

Com o backend funcionando, abra o arquivo `frontend/index.html` pelo Live Server do VS Code.

O sistema será aberto no navegador, permitindo cadastrar e listar alunos.

## Rotas disponíveis

- **GET /api/health** — Verifica se o servidor está funcionando.
- **GET /api/alunos** — Lista os alunos cadastrados.
- **POST /api/alunos** — Cadastra um novo aluno.

## Evidências

As imagens dos testes e do funcionamento do sistema estão na pasta `docs/evidencias`.