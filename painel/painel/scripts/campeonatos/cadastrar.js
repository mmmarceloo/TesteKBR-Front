let conteudoSobreEvento;
let conteudoGinasio;
let conteudoInformacoesGerais;
let entradaPublico;

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

//preenche o select            
// URL do serviço CDN para estados
const estadosURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

// Referência ao elemento select
const selectCidadeEstado = document.getElementById('cidadeEstado');

// Função para preencher o select com as opções
async function preencherSelect() {
document.getElementById("loading-spinner").style.display = "block";
    try {
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
              
              
$(document).ready(function () {
    let cropper;

    $("#imagem").on("change", function () {
        console.log("entrou")
        const input = this;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector("#imagem-preview").src = e.target.result;
               
                $("#crop-imagem").show();
                $(".cropper-container").show();
                
                // Inicialize o Cropper.js
                cropper = new Cropper(document.getElementById("imagem-preview"), {
                    aspectRatio: 1, 
                    viewMode: 2, 
                    maxCanvasWidth: 400
                });
        };
            reader.readAsDataURL(input.files[0]);
        }
        
    });

    $("#crop-imagem").on("click", function () {
        const croppedImage = cropper.getCroppedCanvas().toDataURL("image/jpeg");

        $(".cropper-container").hide();
        $("#imagem-cortada-preview").attr("src", croppedImage).show();
        $("#imagem-cortada-preview").show();
        $("#imagem-preview").hide();

        cropper.destroy();
    });
    
});

function CadastrarCampeonato()
{
    verificaCampos()
    document.getElementById("loading-spinner").style.display = "block";
    const codigo = document.getElementById('codigo').value;
    const titulo = document.getElementById('titulo').value;
    const imagem = document.getElementById('imagem').files[0].name;
    const arquivoImagem = document.getElementById('imagem').files[0];
    const cidadeEstado = document.getElementById('cidadeEstado').value;
    const dataRealizacao = document.getElementById('dataRealizacao').value;
    const destaque = document.querySelector("#tipo").checked;
    const fase = document.querySelector("#fase").value;
    const status = document.querySelector("#status").value;

    const campeonato = {
        Codigo: codigo,
        Titulo: titulo,
        Imagem: imagem,
        CidadeEstado: cidadeEstado,
        DataRealizacao: dataRealizacao,
        SobreEvento: conteudoSobreEvento.getData(),
        Ginasio: conteudoGinasio.getData(),
        InformacoesGerais: conteudoInformacoesGerais.getData(),
        EntradaPublico: entradaPublico.getData(),
        Destaque: destaque.toString(),
        Fase: fase,
        Status: status
    }

    const path = pathServidorCampeonato + "campeonatos/cadastrar-campeonato";
    fetch(path, {
        method: 'POST',
        body: JSON.stringify(campeonato),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            salvarFoto();
            const formulario_registro_novo_campeonato = document.querySelector("#form_cadastro_campeonato");
            formulario_registro_novo_campeonato.reset();
            localStorage.setItem('campeonatoSalvo', true);
            resetaTextArea()
            document.getElementById("loading-spinner").style.display = "none";
            window.location.href = "painel.html";
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

function salvarFoto()
{
    const arquivoImagem = document.getElementById('imagem').files[0];
    const formData = new FormData();
    formData.append("foto", arquivoImagem);

    const path = `${pathServidorCampeonato}campeonatos/cadastrar-campeonato-foto`;
    fetch(path, {
        method: "POST",
        body: formData
    })
    .then(response => {
    response.text().then(message => {
        mensagemErro(message)
    });
    })
     .catch(error => {
        console.error("Erro ao enviar a imagem: " + error);
    });
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
            


            