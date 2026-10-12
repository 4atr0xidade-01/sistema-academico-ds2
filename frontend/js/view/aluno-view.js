
/*
 * VIEW DE ALUNOS - VERSÃO COM DOM
 *
 * Localiza os elementos HTML,
 * lê os dados do formulário,
 * apresenta mensagens, tabela e JSON.
 */

const AlunoView = {

    elementos: {},

    // Localiza os elementos da página
    inicializar() {

        AlunoView.elementos.formulario =
            document.getElementById("form-aluno");

        AlunoView.elementos.ra =
            document.getElementById("ra");

        AlunoView.elementos.nome =
            document.getElementById("nome");

        AlunoView.elementos.email =
            document.getElementById("email");

        AlunoView.elementos.curso =
            document.getElementById("curso");

        AlunoView.elementos.turma =
            document.getElementById("turma");

        AlunoView.elementos.mensagem =
            document.getElementById("mensagem");

        AlunoView.elementos.corpoTabela =
            document.getElementById("corpo-tabela-alunos");

        AlunoView.elementos.totalAlunos =
            document.getElementById("total-alunos");

        AlunoView.elementos.saidaJson =
            document.getElementById("saida-json");
    },

    // Configura o evento submit
    configurarFormulario(aoEnviar) {

        AlunoView.elementos.formulario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();

                const dados = AlunoView.lerDados();

                aoEnviar(dados);
            }
        );
    },

    // Lê os valores dos campos
    lerDados() {

        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    // Mensagem de sucesso
    exibirSucesso(mensagem) {

        AlunoView.elementos.mensagem.textContent =
            mensagem;

        AlunoView.elementos.mensagem.className =
            "mensagem sucesso";
    },

    // Mensagem de erro
    exibirErro(mensagem) {

        AlunoView.elementos.mensagem.textContent =
            mensagem;

        AlunoView.elementos.mensagem.className =
            "mensagem erro";
    },

    // Limpa os campos
    limparFormulario() {

        AlunoView.elementos.formulario.reset();

        AlunoView.elementos.ra.focus();
    },

    // Apresenta a lista na tabela
    exibirLista(alunos) {

        const corpoTabela =
            AlunoView.elementos.corpoTabela;

        // Remove as linhas anteriores
        corpoTabela.textContent = "";

        // Atualiza o contador
        AlunoView.elementos.totalAlunos.textContent =
            `Total: ${alunos.length}`;

        // Verifica se existem alunos
        if (alunos.length === 0) {

            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 7;

            celula.textContent =
                "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);

            corpoTabela.appendChild(linha);

            return;
        }

        // Cria as linhas dos alunos
        alunos.forEach(function (aluno) {

            const linha = document.createElement("tr");

            const valores = [
                aluno.id,
                aluno.ra,
                aluno.nome,
                aluno.email,
                aluno.curso,
                aluno.turma,
                aluno.ativo ? "Ativo" : "Inativo"
            ];

            // Cria cada célula
            valores.forEach(function (valor) {

                const celula = document.createElement("td");

                celula.textContent = valor;

                linha.appendChild(celula);
            });

            corpoTabela.appendChild(linha);
        });
    },

    // Apresenta o JSON
    exibirJson(textoJson) {

        AlunoView.elementos.saidaJson.textContent =
            textoJson;
    }
};
