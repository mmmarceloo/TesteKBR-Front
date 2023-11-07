window.jsPDF = window.jspdf.jsPDF
//verifica se algum arquivo foi salvo
let queryString = window.location.search; 

// verificar mensagens
const campeonatoSalvo = localStorage.getItem('campeonatoSalvo');
if (campeonatoSalvo === 'true') {
    mensagemSucesso('Campeonato Cadastrado!')
    localStorage.removeItem('campeonatoSalvo');
} 



// Variável para rastrear o número da página atual
let paginaAtual = 1;
let totalRegistros = 0;
let totalPaginas = 0;
const itensPorPagina = 10; //número de itens por página 

// ver mensagens
const deletado = localStorage.getItem('deletado');
if (deletado === 'true') {
    mensagemSucesso('Campeonato excluído!')
    localStorage.removeItem('deletado');
} 
if (deletado === 'false') {
    mensagemErro("Falha ao excluir campeonato")
    localStorage.removeItem('deletado');
} 

document.getElementById("loading-spinner").style.display = "block";

// Solicitação GET para o endpoint que busca todos os campeonatos
const path = pathServidorCampeonato + "campeonatos/todos";
fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível obter a lista de campeonatos.');
        }
        return response.json();
    })
    .then(data => {
        totalRegistros = data.totalCampeonatos;
        const campeonatos = data.campeonatos;
        totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
        criarBotoesDePaginacao()
        preencheTabela(campeonatos);
        perfil();
        document.getElementById("loading-spinner").style.display = "none";
    })
    .catch(error => {
        console.error('Erro ao buscar a lista de campeonatos:', error);
        document.getElementById("loading-spinner").style.display = "none";
    });

 function preencheTabela(campeonatos)
{

    // Limpa o conteúdo atual da tabela
    const tabela = document.querySelector("table tbody");
    tabela.innerHTML = '';
    

    campeonatos.forEach(campeonato => {
        const novaLinha = document.createElement("tr");
    
        // Cria as células para cada coluna de dados
        const colunaCampeonato = document.createElement("td");
        colunaCampeonato.textContent = campeonato.titulo;
    
        const colunaLocal = document.createElement("td");
        colunaLocal.textContent = campeonato.cidadeEstado;

        const colunaTipo = document.createElement("td");
        if(campeonato.destaque == "true")
        {
            colunaTipo.textContent = "Sim";
        }
        else
        {
            colunaTipo.textContent = "Não";
        }
        
    
        const colunaFase = document.createElement("td");
        colunaFase.textContent = campeonato.fase;

        const colunaStatus = document.createElement("td");
        colunaStatus.textContent = campeonato.status;
        
        const colunaAcoes = document.createElement("td");
        colunaAcoes.setAttribute("id", "acoes");

        htmlGerado = "";
        htmlGerado += `<div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-light d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ver(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                            <div id="editar-campeonato">
                                <a href="#"  class="btn btn-light d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" title="Editar" 
                                data-id=${campeonato.id}
                                onclick="editar(this)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path fill="#141618" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </a>
                            </div>
                            <div id="excluir-campeonato">
                                <a href="#"  class="btn btn-danger d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" title="Deletar" data-id=${campeonato.id} onclick="deletarCampeonato(this)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path fill="#FFF" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path fill="#FFF" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>`;
        colunaAcoes.innerHTML = htmlGerado;
        // Adiciona as colunas à nova linha
        novaLinha.appendChild(colunaCampeonato);
        novaLinha.appendChild(colunaLocal);
        novaLinha.appendChild(colunaTipo);
        novaLinha.appendChild(colunaFase);
        novaLinha.appendChild(colunaStatus);
        novaLinha.appendChild(colunaAcoes);

        // Adiciona a nova linha à tabela
        tabela.appendChild(novaLinha);

    });
}

// Quando o usuário navegar para outra página, esta função busca e exibe os registros da nova página
function carregarPagina(pagina) {
    document.getElementById("loading-spinner").style.display = "block";

    // Número da página e quantidade de itens por página
    paginaAtual = pagina;
    const numeroPagina = pagina;


    // Solicitação GET para buscar os registros da página
    const path = `${pathServidorCampeonato}campeonatos/todos?pagina=${numeroPagina}&itensPorPagina=${itensPorPagina}`;
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter a lista de usuários.');
            }
            return response.json();
        })
        .then(data => {
            const campeonatos = data.campeonatos;
            preencheTabela(campeonatos);
            document.getElementById("loading-spinner").style.display = "none";
        })
        .catch(error => {
            console.error('Erro ao buscar a lista de campeonatos:', error);
            document.getElementById("loading-spinner").style.display = "none";
        });
}

function criarBotoesDePaginacao()
{
    // Remove todos os elementos filhos da lista de páginas
const paginationList = document.querySelector(".pagination");
paginationList.innerHTML = '';

// Adiciona o botão "Anterior"
const previousButton = document.createElement("li");
previousButton.className = "page-item";
previousButton.innerHTML = '<a id="botao-anterior" class="page-link bg-custom border-dark link-light" onclick="botaoAnterior()" href="#">Anterior</a>';
paginationList.appendChild(previousButton);

// Adiciona os links para as páginas
for (let i = 1; i <= totalPaginas; i++) {
    const pageButton = document.createElement("li");
    pageButton.className = "page-item";
    pageButton.innerHTML = `<a class="page-link bg-custom border-dark link-light" href="#" onclick="carregarPagina(${i})">${i}</a>`;
    paginationList.appendChild(pageButton);
}

// Adiciona o botão "Próximo"
const nextButton = document.createElement("li");
nextButton.className = "page-item";
nextButton.innerHTML = '<a id="botao-proximo" class="page-link bg-custom border-dark link-light" onclick="botaoProximo()" href="#">Próximo</a>';
paginationList.appendChild(nextButton);

}

// Quando o botão "Anterior" é clicado
function botaoAnterior()
{
    if (paginaAtual > 1) {
        paginaAtual--; // Diminui o número da página atual
        carregarPagina(paginaAtual); // Chama a função para carregar a página
    }
}

// Quando o botão "Próximo" é clicado
function botaoProximo()
{
    if (paginaAtual < totalPaginas) {
        paginaAtual++; // Aumenta o número da página atual
        carregarPagina(paginaAtual); // Chama a função para carregar a página
    }
}

// Função para preencher o modal com os dados do usuário
function preencherModal(usuario, email, status) {
    // Seleciona os elementos do modal
    const modalTitle = document.querySelector(".modal-title");
    const modalUsuario = document.querySelector("#exampleModal .modal-body .col-6:nth-child(1) div:nth-child(2)");
    const modalStatus = document.querySelector("#exampleModal .modal-body .col-6:nth-child(2) div:nth-child(2)");
    const modalEmail = document.querySelector("#exampleModal .modal-body .col-12 div:nth-child(2)");

    // Preenche os elementos do modal com os valores
    modalTitle.textContent = "Usuário";
    modalUsuario.textContent = usuario;
    modalStatus.textContent = status;
    modalEmail.textContent = email;
}

// Função para adicionar evento de clique aos botões "Ver"
function ver(evento) {
            // Obtém os valores da linha clicada
            const linha = evento.closest("tr");
            const usuario = linha.querySelector("td:nth-child(1)").textContent;
            const email = linha.querySelector("td:nth-child(2)").textContent;
            const status = linha.querySelector("td:nth-child(4)").textContent;

            // Preenche o modal com os valores
            preencherModal(usuario, email, status);
}

// Função para adicionar evento de clique aos botões "Ver"
function novaSenha(evento) {
    // Obtém os valores da linha clicada
    const linha = evento.closest("tr");
    const usuario = linha.querySelector("td:nth-child(1)").textContent;
    const email = linha.querySelector("td:nth-child(2)").textContent;
    const status = linha.querySelector("td:nth-child(4)").textContent;

    // Preenche o modal com os valores
    preencherModal(usuario, email, status);
}

function editar(element) {
    const id = element.getAttribute("data-id");

    // Redireciona para a página de edição com os parâmetros na URL
    window.location.href = `Editar.html?id=${id}`;
}

async function deletarCampeonato(element) {
    document.getElementById("loading-spinner").style.display = "block";
    // Obtém o valor do atributo data-id
    const dataId = element.getAttribute("data-id");
    let resposta = false;

    resposta = await mensagemConfirmacao("Deseja realmente excluir o campeonato?");

    if(resposta)
    {
        const path = pathServidorCampeonato + `campeonatos/excluir/${dataId}`;
        fetch(path, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('deletado', true);
                document.getElementById("loading-spinner").style.display = "none";
                window.location.reload(); // Atualiza a página
            } else {
                localStorage.setItem('deletado', false);
                document.getElementById("loading-spinner").style.display = "none";
                window.location.reload(); // Atualiza a página
            }
        })
        .catch(error => {
            console.error("Erro na exclusão:", error);
        });
    }
}

//Filtro
const filtroForm = document.querySelector("#filtro");

filtroForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const destaque = document.getElementById("destaque-filtro").checked;
    const status = document.getElementById("status-filtro").value;
    const fase = document.getElementById("fase-filtro").value;
    const de = document.getElementById("de-filtro").value;
    const ate = document.getElementById("ate-filtro").value;

    const path = pathServidorCampeonato + `Campeonatos/filtrar?destaque=${destaque.toString()}&status=${status}&fase=${fase}&de=${de}&ate=${ate}`;

    fetch(path)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                mensagemErro("Não foram encontrados resultados.");
            }
        })
        .then(data => {
            document.querySelector("#filtro").reset()
            preencheTabela(data)
        })
        .catch(error => {
            console.error("Erro na solicitação:", error);
        });
});

function baixarExcel()
{
    const tabela = document.querySelector("table");

    const data = XLSX.utils.table_to_book(tabela, { sheet: "Sheet1" });

    // Converte para um array de bytes
    const arrayBuffer = XLSX.write(data, { bookType: "xlsx", type: "array" });

    // Cria um Blob a partir do array de bytes
    const blob = new Blob([arrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Cria um objeto URL do Blob
    const blobUrl = URL.createObjectURL(blob);

    // Cria um link para fazer o download
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "dados.xlsx";
    document.body.appendChild(a);

    // Simula um clique no link para iniciar o download
    a.click();

    // Limpa o link
    document.body.removeChild(a);
}

function baixarPDF()
{
    window.jsPDF = window.jspdf.jsPDF
    const tabela = document.querySelector("table");
    
    const doc = new jsPDF();
    
    doc.autoTable({ html: tabela });
    
    doc.save("tabela.pdf");
}

function salvarNovaSenha()
{
    document.getElementById("loading-spinner").style.display = "block";
    const senhaAtual = document.querySelector("#senhaAtual").value;
    const novaSenha = document.querySelector("#novaSenha").value;
    const confSenha = document.querySelector("#confSenha").value;

      // Valide se os campos estão preenchidos corretamente
      if (!senhaAtual || !novaSenha || !confSenha) {
        document.getElementById("loading-spinner").style.display = "none";
        mensagemErro("Por favor, preencha todos os campos.");
        return;
    }

    if (novaSenha !== confSenha) {
        document.getElementById("loading-spinner").style.display = "none";
        mensagemErro("A nova senha e a confirmação de senha não coincidem.");
        return;
    }

    // Prepare os dados para enviar para o servidor
    const data = {
        Id: idUsuario, // variavel global de id do usuario
        Senha_Antiga: senhaAtual,
        Senha_Nova: novaSenha,
    };
    const path = pathServidor + "usuarios/muda-senha";
    fetch(path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            console.log("response");
            console.log(response);
            return response.json(); // Retorne a promessa resultante
        })
        .then(data => {
            console.log("data-> ")
            console.log(data);
            document.getElementById("loading-spinner").style.display = "none";
            if (data.message === "Senha alterada com sucesso.") {
                mensagemSucesso(data.message);
                // Redirecione ou atualize a página conforme necessário
            } else {
                mensagemErro("Erro ao alterar a senha. Verifique as informações fornecidas.");
            }
        })
        .catch(error => {
            document.getElementById("loading-spinner").style.display = "none";
            mensagemErro("Ocorreu um erro ao processar a solicitação: " + error);
        });
}







