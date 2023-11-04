document.addEventListener('DOMContentLoaded', function () {
  //configura dados de login
  const mensagem_boas_vindas = document.querySelector("#mensagem-boas-vindas");
  if(mensagem_boas_vindas)
  {
    const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'));
    window.idUsuario = dadosDoUsuario.id; // cria uma variavel global com o id do usuario
    mensagem_boas_vindas.innerText = "Bem vindo(a) " + dadosDoUsuario.nome;
  }
});
window.pathServidor = "https://localhost:7054/"; // substitua aqui para um novo servidor

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