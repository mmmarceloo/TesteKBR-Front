// Função para ler os parâmetros da URL
function obterParametroDaURL(nome) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(nome);
}

// Preenche os campos de edição com os valores dos parâmetros
document.addEventListener("DOMContentLoaded", function () {
    const id = obterParametroDaURL("id");
    const usuario = obterParametroDaURL("usuario");
    const email = obterParametroDaURL("email");
    const perfil = obterParametroDaURL("perfil");
    const status = obterParametroDaURL("status");
    if (id) {
        document.getElementById("usuario").dataset.id = decodeURIComponent(id);
    }

    if (usuario) {
        document.getElementById("usuario").value = decodeURIComponent(usuario);
    }

    if (email) {
        document.getElementById("email").value = decodeURIComponent(email);
    }

    if (perfil) {
        document.getElementById("perfil").value = decodeURIComponent(perfil);
    }
    if (status) {
        document.getElementById("status").value = decodeURIComponent(status);
    }
});

function atualizarUsuario() {
    const id = document.getElementById("usuario").dataset.id;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const perfil = document.getElementById("perfil").value;
    const status = document.getElementById("status").value;
    const senha = document.getElementById("senha").value;
    const confSenha = document.getElementById("confSenha").value;
    if(senha != confSenha)
    {
        mensagemErro("As senhas são diferentes!")
        document.getElementById("loading-spinner").style.display = "none";
        senha.focus;
        return;
    }
    const dadosUsuario = {
        id: id,
        usuario: usuario,
        email: email,
        perfil: perfil,
        status: status,
        senha: senha
    };

    // Enviar os dados para o servidor (usando o método POST)
    const path = pathServidor + "usuarios/atualizar";
    fetch(path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => {
        if (response.ok) {
            mensagemSucesso("Atualizado!")
        } else {
            console.error("Erro ao atualizar o usuário.");
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });
}
