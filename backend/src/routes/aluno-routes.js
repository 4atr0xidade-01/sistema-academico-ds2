/* Importa o Controller de alunos. */
import AlunoController from "../controller/aluno-controller.js";

/* Importa as funções auxiliares de resposta HTTP. */
import { enviarJson, enviarSemConteudo } from "../utils/http.js";

/*
 * Analisa o método HTTP e o caminho requisitado.
 *
 * Quando encontra uma rota, executa a operação e retorna true.
 * Caso contrário, retorna false para o servidor enviar 404.
 */
export async function tratarRotas(req, res) {
    /*
     * new URL() permite obter o caminho mesmo quando
     * o endereço também inclui parâmetros de consulta.
     */
    const url = new URL(
        req.url,
        `http://${req.headers.host || "localhost"}`
    );

    const caminho = url.pathname;
    const metodo = req.method;

    /*
     * OPTIONS responde à verificação antecipada do navegador
     * utilizada em requisições entre origens diferentes (CORS).
     */
    if (metodo === "OPTIONS") {
        enviarSemConteudo(res);
        return true;
    }

    /* GET /api/health: verifica se o servidor está funcionando. */
    if (metodo === "GET" && caminho === "/api/health") {
        enviarJson(res, 200, {
            status: "ok",
            mensagem: "Servidor funcionando."
        });
        return true;
    }

    /* GET /api/alunos: chama o Controller para listar alunos. */
    if (metodo === "GET" && caminho === "/api/alunos") {
        AlunoController.listar(req, res);
        return true;
    }

    /* POST /api/alunos: chama o Controller para cadastrar aluno. */
    if (metodo === "POST" && caminho === "/api/alunos") {
        await AlunoController.cadastrar(req, res);
        return true;
    }

    /* Nenhuma das rotas acima corresponde à requisição. */
    return false;
}
