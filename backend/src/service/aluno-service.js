
/*
 * Importa o Model para validação.
 */
import AlunoModel from "../model/aluno-model.js";

/*
 * Importa o Repository para acessar o banco.
 */
import AlunoRepository
    from "../repository/aluno-repository.js";

/*
 * O Service coordena as regras da operação.
 */
const AlunoService = {

    /*
     * Lista os alunos.
     */
    async listar() {
        return AlunoRepository.listar();
    },

    /*
     * Busca um aluno pelo ID.
     */
    async buscarPorId(id) {

        const idNumerico =
            AlunoModel.converterId(id);

        if (idNumerico === null) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um ID válido."
            };
        }

        const aluno =
            await AlunoRepository.buscarPorId(idNumerico);

        if (!aluno) {
            return {
                sucesso: false,
                status: 404,
                mensagem: "Aluno não encontrado."
            };
        }

        return {
            sucesso: true,
            status: 200,
            aluno
        };
    },

    /*
     * Cadastra um aluno.
     */
    async cadastrar(dados) {

        /*
         * Valida os dados no Model.
         */
        const validacao =
            AlunoModel.validarDados(dados);

        if (!validacao.sucesso) {
            return validacao;
        }

        /*
         * Verifica se o RA já existe no banco.
         */
        const alunoExistente =
            await AlunoRepository.buscarPorRa(
                validacao.dados.ra
            );

        if (alunoExistente) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        /*
         * Solicita a inserção ao Repository.
         */
        const aluno =
            await AlunoRepository.cadastrar(
                validacao.dados
            );

        return {
            sucesso: true,
            status: 201,
            aluno
        };
    },

    /*
     * Atualiza um aluno.
     */
    async atualizar(id, dados) {

        const idNumerico =
            AlunoModel.converterId(id);

        if (idNumerico === null) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um ID válido."
            };
        }

        /*
         * Verifica se o aluno existe.
         */
        const alunoAtual =
            await AlunoRepository.buscarPorId(
                idNumerico
            );

        if (!alunoAtual) {
            return {
                sucesso: false,
                status: 404,
                mensagem: "Aluno não encontrado."
            };
        }

        /*
         * Valida os novos dados.
         */
        const validacao =
            AlunoModel.validarDados(dados);

        if (!validacao.sucesso) {
            return validacao;
        }

        /*
         * Procura outro aluno com o mesmo RA.
         * O ID atual é ignorado.
         */
        const raExistente =
            await AlunoRepository.buscarPorRa(
                validacao.dados.ra,
                idNumerico
            );

        if (raExistente) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        const aluno =
            await AlunoRepository.atualizar(
                idNumerico,
                validacao.dados
            );

        return {
            sucesso: true,
            status: 200,
            aluno
        };
    },

    /*
     * Exclui um aluno.
     */
    async remover(id) {

        const idNumerico =
            AlunoModel.converterId(id);

        if (idNumerico === null) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um ID válido."
            };
        }

        /*
         * Busca o aluno antes da exclusão.
         */
        const aluno =
            await AlunoRepository.buscarPorId(
                idNumerico
            );

        if (!aluno) {
            return {
                sucesso: false,
                status: 404,
                mensagem: "Aluno não encontrado."
            };
        }

        await AlunoRepository.remover(idNumerico);

        return {
            sucesso: true,
            status: 200,
            aluno
        };
    }
};

/*
 * Exporta o Service.
 */
export default AlunoService;
