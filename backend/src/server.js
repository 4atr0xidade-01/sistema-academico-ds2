
/*
 * Carrega o arquivo .env.
 */
import "dotenv/config";

/*
 * Importa a aplicação Express.
 */
import app from "./app.js";

/*
 * Importa o teste da conexão com o banco.
 */
import {
    testarConexao
} from "./config/database.js";

/*
 * Configura a porta e o host.
 */
const PORTA = Number(process.env.PORT) || 3000;

const HOST = "0.0.0.0";

/*
 * Inicializa o banco e o servidor.
 */
async function iniciarServidor() {

    try {

        /*
         * Verifica o MySQL antes de liberar
         * o servidor para receber requisições.
         */
        await testarConexao();

        console.log(
            "Conexão com o MySQL realizada com sucesso."
        );

        /*
         * Inicia o servidor Express.
         */
        app.listen(PORTA, HOST, () => {

            console.log(
                `Servidor disponível em http://localhost:${PORTA}`
            );

        });

    } catch (erro) {

        console.error(
            "Não foi possível conectar ao MySQL:",
            erro.message
        );

        /*
         * Encerra a aplicação indicando erro.
         */
        process.exit(1);
    }
}

/*
 * Inicia o servidor.
 */
iniciarServidor();
