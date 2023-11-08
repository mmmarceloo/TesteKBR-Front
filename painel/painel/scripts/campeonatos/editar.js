let conteudoSobreEvento;
let conteudoGinasio;
let conteudoInformacoesGerais;
let entradaPublico;

// Função para ler os parâmetros da URL
function obterParametroDaURL(nome) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(nome);
}

// Preenche os campos de edição com os valores dos parâmetros
document.addEventListener("DOMContentLoaded", function () {
    const id = obterParametroDaURL("id");
    if (id) {
        document.getElementById("codigo").dataset.id = decodeURIComponent(id);
    }
      const path = pathServidorCampeonato + `campeonatos/buscar-campeonato/${parseInt(id)}`;

      fetch(path, {
          method: "GET",
      })
      .then(response => {
          if (response.ok) {
              return response.json(); 
          } else {
              console.error("Erro ao buscar o campeonato.");
              throw new Error("Erro ao buscar o campeonato.");
          }
      })
      .then(campeonato => {
        preecheCampos(campeonato)

      })
      .catch(error => {
          console.error("Erro na requisição:", error);
      });

});

function preecheCampos(campeonato)
{
    document.getElementById("id").value = campeonato.id;
    document.getElementById("codigo").value = campeonato.codigo;
    document.getElementById("titulo").value = campeonato.titulo;
    document.getElementById("dataRealizacao").value = campeonato.dataRealizacao;
    document.getElementById("sobreEvento").value = campeonato.sobreEvento;
    document.getElementById("ginasio").value = campeonato.ginasio;
    document.getElementById("informacoesGerais").value = campeonato.informacoesGerais;
    document.getElementById("entradaPublico").value = campeonato.entradaPublico;
    document.getElementById("fase").value = campeonato.fase;
    document.getElementById("tipo").value = campeonato.tipo;
    document.getElementById("status").value = campeonato.status;

    setarSelect(campeonato.fase, "status");
    setarSelect(campeonato.cidadeEstado, "status");
    setarSelect(campeonato.fase, "fase");
    setarData(campeonato.dataRealizacao);
    setaTextArea(campeonato);
    if(campeonato.destaque == "true")
    {
      document.querySelector("#destaque").checked = true
    }
    const imagem = document.querySelector("#imagem-preview");
    imagem.display = 'block';
    const path = pathServidorCampeonato + `Campeonatos/exibeImagem?arquivo=${campeonato.imagem}`
    imagem.src = path.replace(/\\/g, '/');
}

function setaTextArea(campeonato)
{
//CKEditor
ClassicEditor
        .create(document.querySelector('#sobreEvento'))
        .then( newEditor => {
            conteudoSobreEvento = newEditor;
        } )
        .catch(error => {
            console.error(error);
        });

    

ClassicEditor
    .create(document.querySelector('#ginasio'))
    .then( newEditor => {
        conteudoGinasio = newEditor;
    } )
    .catch(error => {
        console.error(error);
    });

ClassicEditor
    .create(document.querySelector('#informacoesGerais'))
    .then( newEditor => {
        conteudoInformacoesGerais = newEditor;
    } )
    .catch(error => {
        console.error(error);
    });

ClassicEditor
    .create(document.querySelector('#entradaPublico'))
    .then( newEditor => {
        entradaPublico = newEditor;
    } )
    .catch(error => {
        console.error(error);
    });
}


function setarSelect(texto, campoId)
{
    const selectEscolhido = document.querySelector(`#${campoId}`);
    for (let i = 0; i < selectEscolhido.options.length; i++) {
        const option = selectEscolhido.options[i];
    
        if (option.value === texto) {
            option.selected = true;
            break;
        }
    }
}

function setarData(data)
{
// Crie um objeto Date com a data do banco
const dataConvertida = new Date(data);

// Extraia o ano, mês e dia
const ano = dataConvertida.getFullYear();
const mes = (dataConvertida.getMonth() + 1).toString().padStart(2, "0");
const dia = dataConvertida.getDate().toString().padStart(2, "0");

// Crie a data no formato "AAAA-MM-DD"
const dataFormatada = `${ano}-${mes}-${dia}`;

// Selecione o campo input
const campoData = document.getElementById("dataRealizacao");

// Defina o valor do campo input
campoData.value = dataFormatada;
}


function atualizarCampeonato() {
    verificaCampos()
    document.getElementById("loading-spinner").style.display = "block";
    const codigo = document.getElementById('codigo').value;
    const titulo = document.getElementById('titulo').value;
    const id = document.getElementById('id').value;
    const cidadeEstado = document.getElementById('cidadeEstado').value;
    const dataRealizacao = document.getElementById('dataRealizacao').value;
    const destaque = document.querySelector("#destaque").checked;
    const tipo = document.querySelector("#tipo").value;
    const fase = document.querySelector("#fase").value;
    const status = document.querySelector("#status").value;

    const campeonato = {
        Id: id,
        Codigo: codigo,
        Titulo: titulo,
        Imagem: "zero",
        CidadeEstado: cidadeEstado,
        DataRealizacao: dataRealizacao,
        SobreEvento: conteudoSobreEvento.getData(),
        Ginasio: conteudoGinasio.getData(),
        InformacoesGerais: conteudoInformacoesGerais.getData(),
        EntradaPublico: entradaPublico.getData(),
        Destaque: destaque.toString(),
        Tipo: tipo,
        Fase: fase,
        Status: status
    }
    const path = pathServidorCampeonato + "campeonatos/atualizar";
    fetch(path, {
        method: 'PUT',
        body: JSON.stringify(campeonato),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
           // const formulario_registro_novo_campeonato = document.querySelector("#form_cadastro_campeonato");
          //  formulario_registro_novo_campeonato.reset();
          mensagemSucesso("Campeonato atualizado!")
            //localStorage.setItem('campeonatoAtualizado', true);
           // resetaTextArea()
            document.getElementById("loading-spinner").style.display = "none";
            //window.location.href = "painel.html";
        } else {
            response.text().then(errorMessage => {
                mensagemErro(errorMessage)
            });
        }
    })
    .catch(error => {
        console.error("Erro de rede ou exceção: " + error.message);
    });
    document.getElementById("loading-spinner").style.display = "none";

}
function resetaTextArea()
{
    conteudoSobreEvento.setData('');
    conteudoGinasio.setData('');
    conteudoInformacoesGerais.setData('');
    entradaPublico.setData('');
}
function verificaCampos()
{
    if(conteudoSobreEvento.getData() == "")
    {
        mensagemErro("Falta preencher o seguinte conteudo: Sobre o evento")
        return;
    }
    if(conteudoGinasio.getData() == "")
    {
        mensagemErro("Falta preencher o seguinte conteudo: Ginásio")
        return;
    }
    if(conteudoInformacoesGerais.getData() == "")
    {
        mensagemErro("Falta preencher o seguinte conteudo: Informações Gerais")
        return;
    }
}

// Função para preencher o select com as opções
async function preencherSelect() {
    document.getElementById("loading-spinner").style.display = "block";
    const selectCidadeEstado = document.getElementById('cidadeEstado');
        try {
            const estadosURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
            const estadosResponse = await fetch(estadosURL);
            const estados = await estadosResponse.json();
    
            for (const estado of estados) {
                const municipiosResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`);
                const municipios = await municipiosResponse.json();
    
                municipios.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = `${municipio.nome}, ${estado.sigla}`;
                    option.textContent = `${municipio.nome}, ${estado.sigla}`;
                    selectCidadeEstado.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
        document.getElementById("loading-spinner").style.display = "none";
    }
    preencherSelect();

