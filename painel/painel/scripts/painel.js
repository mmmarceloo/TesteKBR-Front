//verifica se algum arquivo foi salvo
let queryString = window.location.search; 
// Variável para rastrear o número da página atual
let paginaAtual = 1;
let totalRegistros = 0;
let totalPaginas = 0;
const itensPorPagina = 10; //número de itens por página 

// Cria um objeto URLSearchParams a partir da string da consulta
const params = new URLSearchParams(queryString);
// Recupera o valor associado à chave "resposta"
const cadastro = params.get('resposta');
if (cadastro === 'true') {
    mensagemSucesso('Usuário salvo com sucesso!')
    params.set('resposta', '');
} 
if (cadastro === 'false') {
    mensagemErro("O usuário não foi salvo")
    params.set('resposta', '');
} 

const deletado = localStorage.getItem('deletado');
if (deletado === 'true') {
    mensagemSucesso('Usuário excluído!')
    localStorage.removeItem('deletado');
} 
if (deletado === 'false') {
    mensagemErro("Falha ao excluir usuário")
    localStorage.removeItem('deletado');
} 

document.getElementById("loading-spinner").style.display = "block";

// Solicitação GET para o endpoint que busca todos os usuários
const path = pathServidor + "usuarios/todos";
fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível obter a lista de usuários.');
        }
        return response.json();
    })
    .then(data => {
        totalRegistros = data.totalUsuarios;
        const usuarios = data.usuarios;
        totalPaginas = Math.ceil(totalRegistros      / itensPorPagina);
        criarBotoesDePaginacao()
        console.log('Lista de Usuários:', usuarios);
        preencheTabela(usuarios);
        document.getElementById("loading-spinner").style.display = "none";
    })
    .catch(error => {
        console.error('Erro ao buscar a lista de usuários:', error);
        document.getElementById("loading-spinner").style.display = "none";
    });

 function preencheTabela(usuarios)
{

    // Limpa o conteúdo atual da tabela
    const tabela = document.querySelector("table tbody");
    tabela.innerHTML = '';
    
    // Para cada usuário na lista, uma nova linha na tabela
    usuarios.forEach(usuario => {
        const novaLinha = document.createElement("tr");
    
        // Cria as células para cada coluna de dados
        const colunaUsuario = document.createElement("td");
        colunaUsuario.textContent = usuario.usuario;
    
        const colunaEmail = document.createElement("td");
        colunaEmail.textContent = usuario.email;

        const colunaPerfil = document.createElement("td");
        colunaPerfil.textContent = usuario.perfil;
    
        const colunaStatus = document.createElement("td");
        colunaStatus.textContent = usuario.status;
        
        const colunaAcoes = document.createElement("td");
        colunaAcoes.setAttribute("id", "acoes");

        htmlGerado = "";
        htmlGerado += `<div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-light d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ver(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>

                            <a href="#" class="btn btn-light d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" title="Editar" data-id=${usuario.id} onclick="editar(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path fill="#141618" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </a>

                            <a href="#" class="btn btn-danger d-flex justify-content-center align-items-center rounded-circle p-2 mx-2" title="Deletar" data-id=${usuario.id} onclick="deletarUsuario(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path fill="#FFF" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path fill="#FFF" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                            </a>
                        </div>`;
        colunaAcoes.innerHTML = htmlGerado;
        // Adiciona as colunas à nova linha
        novaLinha.appendChild(colunaUsuario);
        novaLinha.appendChild(colunaEmail);
        novaLinha.appendChild(colunaPerfil);
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
    const path = `${pathServidor}usuarios/todos?pagina=${numeroPagina}&itensPorPagina=${itensPorPagina}`;
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter a lista de usuários.');
            }
            return response.json();
        })
        .then(data => {
            const usuarios = data.usuarios;
            console.log('Lista de Usuários:', usuarios);
            preencheTabela(usuarios);
            document.getElementById("loading-spinner").style.display = "none";
        })
        .catch(error => {
            console.error('Erro ao buscar a lista de usuários:', error);
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

function editar(element) {
    // Obtém a linha pai do botão de "Editar" (onde estão os dados)
    const linha = element.closest("tr");
    
    // Obtém os dados da linha clicada
    const id = element.getAttribute("data-id");
    const usuario = linha.querySelector("td:nth-child(1)").textContent;
    const email = linha.querySelector("td:nth-child(2)").textContent;
    const perfil = linha.querySelector("td:nth-child(3)").textContent;
    const status = linha.querySelector("td:nth-child(4)").textContent;

    // Codifica os dados para que possam ser passados na URL
    const idEncoded = encodeURIComponent(id);
    const usuarioEncoded = encodeURIComponent(usuario);
    const emailEncoded = encodeURIComponent(email);
    const perfilEncoded = encodeURIComponent(perfil);
    const statusEncoded = encodeURIComponent(status);

    // Redireciona para a página de edição com os parâmetros na URL
    window.location.href = `Editar.html?id=${idEncoded}&usuario=${usuarioEncoded}&email=${emailEncoded}&perfil=${perfilEncoded}&status=${statusEncoded}`;
}

async function deletarUsuario(element) {
    document.getElementById("loading-spinner").style.display = "block";
    // Obtém o valor do atributo data-id
    const dataId = element.getAttribute("data-id");
    let resposta = false;

    resposta = await mensagemConfirmacao("Deseja realmente excluir o usuário?");

    if(resposta)
    {
        const path = pathServidor + `usuarios/excluir/${dataId}`;
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

    const search = document.getElementById("search").value;
    const status = document.getElementById("status").value;
    const de = document.getElementById("de").value;
    const ate = document.getElementById("ate").value;

    const filtroForm = document.getElementById("filtro-form");

    const path = pathServidor + `Usuarios/filtrar?search=${search}&status=${status}&de=${de}&ate=${ate}`;

    fetch(path)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Erro ao obter resultados filtrados.");
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








