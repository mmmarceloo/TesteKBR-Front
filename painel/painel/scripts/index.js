const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'));
// Verifica o perfil do usuário
if (dadosDoUsuario.perfil === "administrador") {
    // Se o perfil for "administrador", mostra o item "Usuários"
    document.querySelector('a[href="./usuarios/painel.html"]').style.display = 'block';
} else {
    // Caso contrário, oculta o item "Usuários"
    document.querySelector('a[href="./usuarios/painel.html"]').style.display = 'none';
}