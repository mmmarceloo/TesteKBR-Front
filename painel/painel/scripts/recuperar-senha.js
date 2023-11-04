function recuperarSenha()
{
    document.getElementById("loading-spinner").style.display = "block";
    const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'));
    const id = dadosDoUsuario.id;
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    const email = emailInput.value;

    if (!validarEmail(email)) {
        emailError.classList.remove('d-none');
        emailError.textContent = 'Por favor, insira um endereço de e-mail válido.';
        emailInput.focus();
        document.getElementById("loading-spinner").style.display = "none";
        return;
    }
    const data = {
        Id: id,
        Email: email
    };

    const path = pathServidor + "usuarios/esqueceu-senha";
    fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading-spinner").style.display = "none";
        mensagemSucesso(data.message);
    })
    .catch(error => {
        document.getElementById("loading-spinner").style.display = "none";
        console.error("Erro: " + data.message);
    });
}


function validarEmail(email) {
    // Expressão regular para validar um endereço de e-mail
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}