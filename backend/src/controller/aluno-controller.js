
/*
 * CONTROLLER DE ALUNOS - VERSÃO 1.2
 *
 * O Controller recebe as requisições encaminhadas
 * pelo Router, chama o Model e produz a resposta.
 */

/*
 * Importa o Model responsável pelos dados
 * e pelas regras de negócio dos alunos.
 */
import AlunoModel from "../model/aluno-model.js";

const AlunoController = {

    /*
     * LISTAR TODOS OS ALUNOS
     *
     * Endpoint:
     * GET /api/alunos
     */
    listar(req, res) {

        /*
         * Solicita a lista de alunos ao Model.
         */
        const alunos = AlunoModel.listar();

        /*
         * Envia uma resposta com status 200.
         *
         * O Express transforma automaticamente
         * o objeto JavaScript em JSON.
         */
        return res.status(200).json({
            total: alunos.length,
            dados: alunos
        });
    },

    /*
     * CADASTRAR UM ALUNO
     *
     * Endpoint:
     * POST /api/alunos
     */
    cadastrar(req, res) {

        /*
         * O middleware express.json() já converteu
         * o JSON recebido em um objeto JavaScript.
         *
         * Os dados ficam disponíveis em req.body.
         */
        const dados = req.body;

        /*
         * Encaminha os dados para o Model,
         * que executa as regras de validação
         * e tenta cadastrar o aluno.
         */
        const resultado = AlunoModel.cadastrar(dados);

        /*
         * Verifica se o Model encontrou
         * algum problema durante o cadastro.
         */
        if (!resultado.sucesso) {

            /*
             * Retorna o status informado pelo Model,
             * junto com a mensagem de erro.
             */
            return res.status(resultado.status).json({
                sucesso: false,
                mensagem: resultado.mensagem
            });
        }

        /*
         * Se o cadastro funcionar, retorna 201,
         * indicando que o recurso foi criado.
         */
        return res.status(201).json({
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    }
};

/*
 * Exporta o Controller para o Router.
 */
export default AlunoController;
