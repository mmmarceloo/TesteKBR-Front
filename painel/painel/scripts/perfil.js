
function perfil()
{
// cuida sobre o que cada um pode ver
const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'));
if(dadosDoUsuario)
{
  // Verifica o perfil do usuário
  if (dadosDoUsuario.perfil === "administrador") {
      // Se o perfil for "administrador", mostra o item "Usuários"
  } else {
      // Caso contrário, oculta o item "Usuários"
      const path1 = document.querySelector('a[href="./usuarios/painel.html"]');
      const path2 = document.querySelector('a[href="../usuarios/painel.html"]');
      const editar = document.querySelectorAll("#editar-campeonato");
      const excluir = document.querySelectorAll("#excluir-campeonato");
      const cadastrarCampeonato = document.querySelectorAll("#cadastrar-campeonato");
      const menuCadastrarCampeonato = document.querySelector("#menu-cadastrar-campeonato");
      if(path1)
      {
        path1.style.display = 'none';
      }
      if(path2)
      {
        path2.style.display = 'none';
      }
      if(editar)
      {
        editar.forEach(edit => {
          edit.style.display = 'none';
        })
      }
      if(excluir)
      {
        excluir.forEach(exclui => {
            exclui.style.display = 'none';
        })
      }
      if(cadastrarCampeonato)
      {
        cadastrarCampeonato.forEach(cadas => {
            cadas.style.display = 'none';
        })
      }
      if(menuCadastrarCampeonato)
      {
        menuCadastrarCampeonato.style.display = 'none';
      }

  } 

}
else{
  window.location.href = `login.html`;
}
}