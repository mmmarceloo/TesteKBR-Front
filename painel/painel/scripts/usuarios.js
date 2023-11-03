//Salva novo usuario e verifica senha
const formulario_registro_novo_usuario = document.querySelector("#form_registro_novo_usuario");
formulario_registro_novo_usuario.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("loading-spinner").style.display = "block";
    const campos_formulario = formulario_registro_novo_usuario.elements;
    const senha = document.querySelector("#form_registro_novo_usuario").elements[4].value;
    const confirmar_senha = document.querySelector("#form_registro_novo_usuario").elements[5].value
    if(senha == confirmar_senha)
    {
        const usuario = {}; // Cria um objeto para armazenar os dados do usuário
        //usuario["id"] = ""; //o id foi colocado aqui para representar a classe Usuario da API 

        for (let i = 0; i < campos_formulario.length; i++) {
            if (i == 5)
            {
                break;
            }
            const campo = campos_formulario[i];
            usuario[campo.id] = campo.value; // Armazena o valor no objeto de usuário
        }
        // Envia os dados para o servidor
        const path = pathServidor + "usuarios/salvar";
        fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (!response.ok) {
                mensagemErro("O usuário não foi salvo")
                document.getElementById("loading-spinner").style.display = "none";
                throw new Error('Erro na solicitação: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            formulario_registro_novo_usuario.reset();
            window.location.href = "painel.html?resposta=true";
            document.getElementById("loading-spinner").style.display = "none";
        });
    }
    else
    {
        mensagemErro("As senhas são diferentes!")
        document.getElementById("loading-spinner").style.display = "none";
        senha.focus
    }
    
});

