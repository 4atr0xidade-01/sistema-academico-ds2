
/*
 * ROTAS DE ALUNOS - VERSÃO 1.2
 *
 * Utilizamos o Express Router para organizar
 * os endpoints relacionados aos alunos.
 */

/*
 * Importa o Express para criar um Router.
 */
import express from "express";

/*
 * Importa o Controller responsável
 * pelas operações relacionadas aos alunos.
 */
import AlunoController
    from "../controller/aluno-controller.js";

/*
 * Cria um roteador específico para alunos.
 *
 * Um Router funciona como um pequeno
 * módulo independente de rotas.
 */
const router = express.Router();

/*
 * ROTA DE LISTAGEM
 *
 * Como este Router será registrado no app.js
 * com o prefixo /api/alunos, esta rota será:
 *
 * GET /api/alunos
 */
router.get(
    "/",
    AlunoController.listar
);

/*
 * ROTA DE CADASTRO
 *
 * Esta rota receberá requisições:
 *
 * POST /api/alunos
 */
router.post(
    "/",
    AlunoController.cadastrar
);

/*
 * Exporta o Router para o app.js.
 */
export default router;
