
/*
 * Importa o Service.
 */
import AlunoService from "../service/aluno-service.js";

/*
 * O Controller trabalha com HTTP.
 */
const AlunoController = {

    /*
     * GET /api/alunos
     */
    async listar(req, res, next) {

        try {

            const alunos =
                await AlunoService.listar();

            return res.status(200).json({
                total: alunos.length,
                dados: alunos
            });

        } catch (erro) {
            next(erro);
        }
    },

    /*
     * GET /api/alunos/:id
     */
    async buscarPorId(req, res, next) {

        try {

            const resultado =
                await AlunoService.buscarPorId(
                    req.params.id
                );

            if (!resultado.sucesso) {
                return res
                    .status(resultado.status)
                    .json({
                        sucesso: false,
                        mensagem: resultado.mensagem
                    });
            }

            return res.status(200).json({
                sucesso: true,
                dados: resultado.aluno
            });

        } catch (erro) {
            next(erro);
        }
    },

    /*
     * POST /api/alunos
     */
    async cadastrar(req, res, next) {

        try {

            const resultado =
                await AlunoService.cadastrar(req.body);

            if (!resultado.sucesso) {
                return res
                    .status(resultado.status)
                    .json({
                        sucesso: false,
                        mensagem: resultado.mensagem
                    });
            }

            return res.status(201).json({
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso.",
                dados: resultado.aluno
            });

        } catch (erro) {
            next(erro);
        }
    },

    /*
     * PUT /api/alunos/:id
     */
    async atualizar(req, res, next) {

        try {

            const resultado =
                await AlunoService.atualizar(
                    req.params.id,
                    req.body
                );

            if (!resultado.sucesso) {
                return res
                    .status(resultado.status)
                    .json({
                        sucesso: false,
                        mensagem: resultado.mensagem
                    });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Aluno atualizado com sucesso.",
                dados: resultado.aluno
            });

        } catch (erro) {
            next(erro);
        }
    },

    /*
     * DELETE /api/alunos/:id
     */
    async remover(req, res, next) {

        try {

            const resultado =
                await AlunoService.remover(
                    req.params.id
                );

            if (!resultado.sucesso) {
                return res
                    .status(resultado.status)
                    .json({
                        sucesso: false,
                        mensagem: resultado.mensagem
                    });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Aluno excluído com sucesso.",
                dados: resultado.aluno
            });

        } catch (erro) {
            next(erro);
        }
    }
};

/*
 * Exporta o Controller.
 */
export default AlunoController;
