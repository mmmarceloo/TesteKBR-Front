
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById("loading-spinner").style.display = "block";

        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        const data = {
            email: email,
            senha: senha
        };

        const path = pathServidor + "usuarios/validar-login";
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Login bem-sucedido
                document.getElementById("loading-spinner").style.display = "none";
                response.json().then(data => {
                    const userId = data.id;
                    const userName = data.nome;

                    localStorage.setItem('dadosDoUsuario', JSON.stringify(data));

                    window.location.href = `index.html`;
                });
            } else {
                document.getElementById("loading-spinner").style.display = "none";
                mensagemErro("Credenciais inválidas!")
            }
        })
        .catch(error => {
            document.getElementById("loading-spinner").style.display = "none";
            console.error('Erro na solicitação:', error);
        });
    });
});