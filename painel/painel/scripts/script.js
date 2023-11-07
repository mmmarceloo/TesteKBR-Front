document.addEventListener('DOMContentLoaded', function () {

  //configura dados de login
  const mensagem_boas_vindas = document.querySelector("#mensagem-boas-vindas");
  const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'));

  if(mensagem_boas_vindas)
  {
    if(!dadosDoUsuario)
    {
      window.location.href = `login.html`;
    }
    else{
      window.idUsuario = dadosDoUsuario.id; // cria uma variavel global com o id do usuario
      mensagem_boas_vindas.innerText = "Bem vindo(a) " + dadosDoUsuario.nome;
    }
  }
  perfil()
});

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


  } 

}
else{
  window.location.href = `login.html`;
}
}




window.pathServidor = "https://localhost:7054/"; // serviço de usuarios
window.pathServidorCampeonato = "https://localhost:7058/"; // serviço de campeonatos

function mensagemErro(texto)
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: texto
      })
}

function mensagemSucesso(texto)
{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: texto
      })
}

async function mensagemConfirmacao(texto) {
  const result = await Swal.fire({
      title: texto,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
  });

  if (result.isConfirmed) {
      return true;
  } else if (result.isDenied) {
      return false;
  }
}