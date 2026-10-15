/*
 * FERRAMENTAS HTTP - VERSÃO 1.0
 *
 * Este arquivo reúne funções que ajudam a trabalhar
 * com requisições e respostas HTTP.
 *
 * Ele não guarda alunos e não implementa regras de negócio.
 */

/*
 * Cabeçalhos utilizados para CORS.
 *
 * CORS significa Cross-Origin Resource Sharing.
 * Permite que, em uma futura versão, o frontend servido
 * por outra origem faça requisições para nossa API.
 *
 * Exemplo:
 * Frontend: http://127.0.0.1:5500
 * Backend:  http://localhost:3000
 *
 * Na apostila, utilizamos "*" para permitir qualquer origem
 * nesta etapa didática, sem autenticação.
 */
const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

/*
 * Envia uma resposta no formato JSON.
 *
 * Parâmetros:
 * res    -> resposta HTTP do Node.js;
 * status -> código HTTP (200, 201, 400, 404, 409, 500...);
 * dados  -> objeto ou array convertido para JSON.
 */
export function enviarJson(res, status, dados) {
    /*
     * JSON.stringify() transforma um valor JavaScript em texto JSON.
     * null indica que não aplicaremos uma função de substituição.
     * 2 acrescenta indentação para facilitar a leitura no Insomnia.
     */
    const textoJson = JSON.stringify(dados, null, 2);

    /*
     * writeHead() define o status e os cabeçalhos HTTP.
     * O operador ... espalha os cabeçalhos de CORS no objeto.
     */
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        ...cabecalhosCors
    });

    /* end() finaliza a resposta e envia seu conteúdo. */
    res.end(textoJson);
}

/*
 * Responde a uma requisição OPTIONS sem conteúdo.
 *
 * O navegador pode fazer essa requisição antes de um POST,
 * para conferir quais métodos e cabeçalhos são permitidos.
 * O status HTTP 204 significa sucesso, mas sem corpo.
 */
export function enviarSemConteudo(res) {
    res.writeHead(204, cabecalhosCors);
    res.end();
}

/*
 * Lê o corpo de uma requisição HTTP e transforma
 * o JSON recebido em um objeto JavaScript.
 *
 * A função retorna uma Promise porque os dados chegam
 * em partes, conforme os eventos do Node.js.
 */
export function lerCorpoJson(req) {
    return new Promise((resolve, reject) => {
        // Armazena os pedaços recebidos da requisição.
        let corpo = "";

        /*
         * O evento "data" acontece sempre que chega um pedaço.
         * Acumulamos os dados na variável corpo.
         */
        req.on("data", parte => {
            corpo += parte;
        });

        /*
         * O evento "end" informa que os dados terminaram de chegar.
         * Agora podemos interpretar o conteúdo recebido.
         */
        req.on("end", () => {
            // Uma requisição com corpo vazio é interpretada como {}.
            if (corpo.trim() === "") {
                resolve({});
                return;
            }

            try {
                // JSON.parse() transforma texto JSON em objeto JavaScript.
                const dados = JSON.parse(corpo);
                resolve(dados);
            } catch (erro) {
                // Caso o texto não seja um JSON válido, rejeita a Promise.
                reject(erro);
            }
        });

        // Trata possíveis falhas de leitura da requisição.
        req.on("error", erro => {
            reject(erro);
        });
    });
}