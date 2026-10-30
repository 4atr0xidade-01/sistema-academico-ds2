
/*
 * APLICAÇÃO EXPRESS - VERSÃO 1.2
 *
 * Este arquivo configura a aplicação,
 * os middlewares e as rotas da API.
 */

/*
 * Importa o framework Express.
 */
import express from "express";

/*
 * Importa o middleware CORS.
 */
import cors from "cors";

/*
 * Importa as rotas relacionadas aos alunos.
 */
import alunoRoutes from "./routes/aluno-routes.js";

/*
 * Cria a aplicação Express.
 */
const app = express();

/*
 * Configura o CORS.
 *
 * Permite que o frontend faça requisições
 * para o backend em outra origem.
 */
app.use(
    cors({
        origin: "*",

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

/*
 * Middleware que interpreta requisições JSON.
 *
 * O conteúdo enviado pelo frontend será
 * disponibilizado em req.body.
 */
app.use(express.json());

/*
 * Rota para verificar se a API está funcionando.
 */
app.get("/api/health", (req, res) => {

    return res.status(200).json({
        status: "ok",
        mensagem: "Servidor Express funcionando."
    });

});

/*
 * Registra as rotas de alunos.
 *
 * Todas terão o prefixo /api/alunos.
 */
app.use("/api/alunos", alunoRoutes);

/*
 * Middleware para rotas não encontradas.
 */
app.use((req, res) => {

    return res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });

});

/*
 * Middleware global de tratamento de erros.
 */
app.use((erro, req, res, next) => {

    /*
     * Trata requisições contendo JSON inválido.
     */
    if (erro.type === "entity.parse.failed") {

        return res.status(400).json({
            sucesso: false,
            mensagem:
                "O corpo da requisição contém um JSON inválido."
        });

    }

    /*
     * Registra erros inesperados no terminal.
     */
    console.error("Erro interno do servidor:", erro);

    /*
     * Retorna uma mensagem genérica ao cliente.
     */
    return res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor."
    });

});

/*
 * Exporta a aplicação para o server.js.
 */
export default app;
