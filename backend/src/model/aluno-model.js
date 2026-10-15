/*
 * MODEL DE ALUNOS - BACKEND, VERSÃO 1.0
 *
 * Este array representa temporariamente o armazenamento.
 * Ele fica na memória do processo do servidor Node.js.
 * Quando o servidor é encerrado, os cadastros são perdidos.
 * Em versões futuras, utilizaremos um banco de dados MySQL.
 */
const alunos = [];

/*
 * O Model representa os dados e suas regras de negócio.
 *
 * Responsabilidades:
 * - normalizar o texto recebido;
 * - validar os campos e o e-mail;
 * - verificar RA duplicado;
 * - gerar um ID;
 * - cadastrar e listar alunos.
 */
const AlunoModel = {
    /*
     * Evita espaços extras e erros quando o valor vem
     * como null ou undefined.
     */
    normalizarTexto(valor) {
        if (valor === null || valor === undefined) {
            return "";
        }

        // String() converte para texto; trim() remove espaços nas pontas.
        return String(valor).trim();
    },

    /*
     * Verifica um formato básico de e-mail.
     * Esta validação será melhorada em versões futuras.
     */
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    /*
     * find() procura o primeiro aluno com o RA informado.
     * Se não encontrar, devolve undefined.
     */
    localizarPorRa(ra) {
        return alunos.find(aluno => aluno.ra === ra);
    },

    /*
     * Gera o próximo identificador a partir do maior ID.
     * Sem alunos cadastrados, o primeiro ID será 1.
     */
    gerarProximoId() {
        if (alunos.length === 0) {
            return 1;
        }

        // map() cria um array apenas com os IDs.
        const ids = alunos.map(aluno => aluno.id);

        // Math.max() encontra o maior; ... espalha os itens como argumentos.
        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },

    /*
     * Cadastra um aluno.
     * Espera um objeto com ra, nome, email, curso e turma.
     * O operador ?. evita erro se dados não tiver sido enviado.
     */
    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados?.ra);
        const nome = AlunoModel.normalizarTexto(dados?.nome);
        const email = AlunoModel.normalizarTexto(dados?.email);
        const curso = AlunoModel.normalizarTexto(dados?.curso);
        const turma = AlunoModel.normalizarTexto(dados?.turma);

        /* Todos os campos são obrigatórios. */
        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        /* Verifica o formato básico do e-mail. */
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um e-mail válido."
            };
        }

        /* O mesmo RA não pode ser cadastrado duas vezes. */
        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        /*
         * Cria o objeto que representa o aluno.
         * O ID é calculado no Model e ativo começa como true.
         */
        const aluno = {
            id: AlunoModel.gerarProximoId(),
            ra,
            nome,
            email,
            curso,
            turma,
            ativo: true
        };

        // Armazena o novo aluno no array em memória.
        alunos.push(aluno);

        // 201 significa que um novo recurso foi criado.
        return {
            sucesso: true,
            status: 201,
            aluno
        };
    },

    /*
     * Lista todos os alunos.
     * O operador ... cria uma cópia superficial do array.
     */
    listar() {
        return [...alunos];
    }
};

// Permite que o Controller importe este Model.
export default AlunoModel;
