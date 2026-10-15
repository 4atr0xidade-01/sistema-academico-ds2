/*
 * Importa o Model responsável pelo armazenamento
 * temporário e pelas regras dos alunos.
 */
import AlunoModel from "../model/aluno-model.js";

/*
 * Importa as funções auxiliares para ler requisições
 * e responder ao cliente no formato JSON.
 */
import { enviarJson, lerCorpoJson } from "../utils/http.js";

/*
 * CONTROLLER DE ALUNOS - BACKEND, VERSÃO 1.0
 *
 * A rota chama o Controller; o Controller conversa
 * com o Model e organiza a resposta HTTP.
 *
 * Ele NÃO precisa saber como os alunos são armazenados.
 */
const AlunoController = {
    /*
     * GET /api/alunos
     * Solicita a lista ao Model e devolve status 200.
     */
    listar(req, res) {
        const alunos = AlunoModel.listar();

        enviarJson(res, 200, {
            total: alunos.length,
            dados: alunos
        });
    },

    /*
     * POST /api/alunos
     * async indica que aguardamos uma operação assíncrona.
     */
    async cadastrar(req, res) {
        try {
            /*
             * Lê o corpo recebido por HTTP e converte
             * a string JSON em um objeto JavaScript.
             */
            const dados = await lerCorpoJson(req);

            // Delega ao Model a validação e o cadastro.
            const resultado = AlunoModel.cadastrar(dados);

            /*
             * Se a validação falhou, devolve a mensagem
             * com o código fornecido pelo Model.
             */
            if (!resultado.sucesso) {
                enviarJson(res, resultado.status, {
                    sucesso: false,
                    mensagem: resultado.mensagem
                });
                return;
            }

            /*
             * 201 = Created.
             * Inclui o aluno cadastrado em dados.
             */
            enviarJson(res, resultado.status, {
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso.",
                dados: resultado.aluno
            });
        } catch (erro) {
            /*
             * Nesta versão, esse bloco trata principalmente
             * requisições que contêm JSON inválido.
             */
            enviarJson(res, 400, {
                sucesso: false,
                mensagem: "O corpo da requisição contém um JSON inválido."
            });
        }
    }
};

// Permite que o arquivo de rotas utilize este Controller.
export default AlunoController;
