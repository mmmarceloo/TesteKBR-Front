// Extrai o token da URL
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get("token");

// Insere o token em um campo oculto no formulário
document.getElementById("tokenField").value = resetToken;


function resetSenha()
{
    document.getElementById("loading-spinner").style.display = "block";
    const novaSenha = document.getElementById("novaSenha").value;
    const confSenha = document.getElementById("confSenha").value;
    const token = document.getElementById("tokenField").value;

    if (novaSenha !== confSenha) {
        mensagemErro("As senhas não coincidem.");
        return;
    }

    const data = {
        Senha: novaSenha,
        Token: token
    };
    const path = pathServidor + "usuarios/redefine-senha";
    fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => ({ status: 'ok', message: data.message }));
            } else if (response.status === 400) {
                return response.json().then(data => ({ status: 'badRequest', message: data.message }));
            } else {
                return response.json().then(data => ({ status: 'other', message: data.message }));
            }
        })
        .then(data => {
            if (data.status === 'ok') {
                mensagemSucesso(data.message);
            } else if (data.status === 'badRequest') {
                mensagemErro(data.message); 
            } 
        })
        .catch(error => {
            console.error("Ocorreu um erro:", error);
        });
        document.getElementById("loading-spinner").style.display = "none";
    
}




