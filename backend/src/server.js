/*
 * SERVIDOR HTTP - SISTEMA ACADÊMICO, VERSÃO 1.0
 *
 * Aqui utilizamos o módulo nativo do Node.js.
 * Não é necessário instalar Express nesta etapa.
 */
import http from "node:http";

/* Importa a função que direciona as requisições às rotas. */
import { tratarRotas } from "./routes/aluno-routes.js";

/* Importa o utilitário responsável pelas respostas JSON. */
import { enviarJson } from "./utils/http.js";

/*
 * Define onde o servidor será executado.
 * process.env.PORT permite usar uma porta configurada
 * pelo ambiente (importante quando fizermos deploy).
 * Localmente, utilizamos a porta 3000.
 */
const PORTA = Number(process.env.PORT) || 3000;

/*
 * 0.0.0.0 aceita conexões pelas interfaces de rede.
 * Em desenvolvimento, acessamos pelo localhost.
 */
const HOST = "0.0.0.0";

/*
 * createServer() cria o servidor e recebe req e res:
 * req: dados da requisição;
 * res: objeto utilizado para enviar a resposta.
 */
const servidor = http.createServer(async (req, res) => {
    try {
        /*
         * Encaminha a requisição para o arquivo de rotas.
         * A Promise é aguardada, pois POST lê o JSON recebido.
         */
        const rotaEncontrada = await tratarRotas(req, res);

        /* Se nenhuma rota correspondeu, responde com 404. */
        if (!rotaEncontrada) {
            enviarJson(res, 404, {
                sucesso: false,
                mensagem: "Rota não encontrada."
            });
        }
    } catch (erro) {
        /*
         * Erros inesperados ficam registrados no terminal.
         * Não devolvemos detalhes internos ao usuário.
         */
        console.error("Erro interno do servidor:", erro);
        enviarJson(res, 500, {
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });
    }
});

/* Inicia o servidor e deixa a API aguardando requisições. */
servidor.listen(PORTA, HOST, () => {
    console.log(`Servidor disponível em http://localhost:${PORTA}`);
});
