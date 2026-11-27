
/*
 * O Model normaliza e valida os dados
 * relacionados aos alunos.
 *
 * O armazenamento agora pertence ao Repository.
 */
const AlunoModel = {

    /*
     * Normaliza um texto.
     */
    normalizarTexto(valor) {

        if (valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    /*
     * Valida inicialmente o e-mail.
     */
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    /*
     * Converte e valida um ID.
     */
    converterId(id) {

        const idNumerico = Number(id);

        if (
            !Number.isInteger(idNumerico) ||
            idNumerico <= 0
        ) {
            return null;
        }

        return idNumerico;
    },

    /*
     * Normaliza e valida os dados do aluno.
     */
    validarDados(dados) {

        const aluno = {

            ra: AlunoModel.normalizarTexto(dados?.ra),

            nome:
                AlunoModel.normalizarTexto(dados?.nome),

            email:
                AlunoModel.normalizarTexto(dados?.email)
                    .toLowerCase(),

            curso:
                AlunoModel.normalizarTexto(dados?.curso),

            turma:
                AlunoModel.normalizarTexto(dados?.turma)
        };

        /*
         * Verifica os campos obrigatórios.
         */
        if (
            aluno.ra === "" ||
            aluno.nome === "" ||
            aluno.email === "" ||
            aluno.curso === "" ||
            aluno.turma === ""
        ) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        /*
         * Valida o e-mail.
         */
        if (!AlunoModel.validarEmail(aluno.email)) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um e-mail válido."
            };
        }

        return {
            sucesso: true,
            dados: aluno
        };
    }
};

/*
 * Exporta o Model.
 */
export default AlunoModel;
