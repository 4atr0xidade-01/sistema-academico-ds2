
/*
 * Importa o pool de conexões.
 */
import pool from "../config/database.js";

/*
 * Converte o registro retornado pelo MySQL
 * para o formato utilizado pela API.
 */
function mapearAluno(registro) {

    if (!registro) {
        return null;
    }

    return {
        id: registro.id,
        ra: registro.ra,
        nome: registro.nome,
        email: registro.email,
        curso: registro.curso,
        turma: registro.turma,

        /*
         * O MySQL normalmente devolve BOOLEAN
         * como 0 ou 1.
         */
        ativo: Boolean(registro.ativo)
    };
}

/*
 * O Repository concentra os comandos SQL.
 */
const AlunoRepository = {

    /*
     * Lista todos os alunos.
     */
    async listar() {

        const sql = `
            SELECT
                id,
                ra,
                nome,
                email,
                curso,
                turma,
                ativo
            FROM alunos
            ORDER BY id
        `;

        /*
         * O primeiro item contém os registros.
         */
        const [registros] = await pool.execute(sql);

        return registros.map(mapearAluno);
    },

    /*
     * Busca um aluno pelo ID.
     */
    async buscarPorId(id) {

        const sql = `
            SELECT
                id,
                ra,
                nome,
                email,
                curso,
                turma,
                ativo
            FROM alunos
            WHERE id = ?
            LIMIT 1
        `;

        /*
         * O ponto de interrogação é substituído
         * pelo valor enviado no array.
         */
        const [registros] = await pool.execute(
            sql,
            [id]
        );

        return mapearAluno(registros[0]);
    },

    /*
     * Busca um aluno pelo RA.
     *
     * idIgnorado é utilizado durante a atualização,
     * para não considerar o próprio aluno duplicado.
     */
    async buscarPorRa(ra, idIgnorado = null) {

        let sql;
        let valores;

        if (idIgnorado === null) {

            sql = `
                SELECT
                    id,
                    ra,
                    nome,
                    email,
                    curso,
                    turma,
                    ativo
                FROM alunos
                WHERE ra = ?
                LIMIT 1
            `;

            valores = [ra];

        } else {

            sql = `
                SELECT
                    id,
                    ra,
                    nome,
                    email,
                    curso,
                    turma,
                    ativo
                FROM alunos
                WHERE ra = ?
                  AND id <> ?
                LIMIT 1
            `;

            valores = [ra, idIgnorado];
        }

        const [registros] =
            await pool.execute(sql, valores);

        return mapearAluno(registros[0]);
    },

    /*
     * Insere um aluno.
     */
    async cadastrar(dados) {

        const sql = `
            INSERT INTO alunos (
                ra,
                nome,
                email,
                curso,
                turma,
                ativo
            )
            VALUES (?, ?, ?, ?, ?, TRUE)
        `;

        const valores = [
            dados.ra,
            dados.nome,
            dados.email,
            dados.curso,
            dados.turma
        ];

        /*
         * insertId contém o ID gerado pelo MySQL.
         */
        const [resultado] =
            await pool.execute(sql, valores);

        /*
         * Consulta e devolve o aluno criado.
         */
        return AlunoRepository.buscarPorId(
            resultado.insertId
        );
    },

    /*
     * Atualiza os dados de um aluno.
     */
    async atualizar(id, dados) {

        const sql = `
            UPDATE alunos
            SET
                ra = ?,
                nome = ?,
                email = ?,
                curso = ?,
                turma = ?
            WHERE id = ?
        `;

        const valores = [
            dados.ra,
            dados.nome,
            dados.email,
            dados.curso,
            dados.turma,
            id
        ];

        await pool.execute(sql, valores);

        return AlunoRepository.buscarPorId(id);
    },

    /*
     * Exclui um aluno.
     */
    async remover(id) {

        const sql = `
            DELETE FROM alunos
            WHERE id = ?
        `;

        const [resultado] =
            await pool.execute(sql, [id]);

        /*
         * affectedRows indica quantos registros
         * foram afetados pela exclusão.
         */
        return resultado.affectedRows;
    }
};

/*
 * Exporta o Repository.
 */
export default AlunoRepository;
