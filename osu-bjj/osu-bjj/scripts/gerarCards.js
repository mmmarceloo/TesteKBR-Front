function criarCardDinamicamente(campeonatos)
{

  campeonatos.forEach(campeonato => {
    if(campeonato.destaque == "true" && campeonato.status == "Ativo")
    {
      gerarCard(campeonato, "#conteiner_destaques")
    }
  });
let contador = 1;
  campeonatos.forEach(campeonato => {
    if(campeonato.destaque != "true" && campeonato.status == "Ativo" && contador < 5)
    {
      gerarCard(campeonato, "#conteiner_demais_competicoes")
      contador++;
    }
  });

}

function gerarCard(campeonato, conteiner)
{
  const article = document.createElement("article");
  article.classList.add(
    "relative",
    "w-full",
    "rounded-xl",
    "overflow-hidden",
    "shadow-xl",
    "p-2",
    "outline",
    "outline-1",
    "outline-gray-400",
    "text-gray-900",
    "hover:-translate-y-2",
    "transition-transform",
    "duration-300"
  );
  const x = campeonato.dataRealizacao;
  let corDaFase = "";
  if(campeonato.fase == "Inscricoes Abertas")
  {
    corDaFase = "bg-green-600";
    campeonato.fase = "Inscrições Abertas"
  }
  if(campeonato.fase == "Chaves de Lutas")
  {
    corDaFase = "bg-yellow-600";
    campeonato.fase = "Chaveamento"
  }
  if(campeonato.fase == "Resultados")
  {
    corDaFase = "bg-blue-700";
    campeonato.fase = "Classificação"
  }

  const abreviacaoMes = obterAbreviacaoMes(campeonato.dataRealizacao)
  const dia = obterDia(campeonato.dataRealizacao)

   const path = pathServidorCampeonato + `Campeonatos/exibeImagem?arquivo=${campeonato.imagem}`
   const pathFormatado = path.replace(/\\/g, '/');

  htmlGerado = "";
  htmlGerado += `
            <img
              src="${pathFormatado}"
              alt="Imagem do torneio"
              class="rounded-md w-full h-[200px] object-cover"
            />
            <div class="p-3 relative">
              <div
                class="absolute -top-14 bg-white px-4 py-2 rounded-md shadow-md shadow-gray-500 text-center"
              >
                <p class="text-2xl font-bold" data-calendar>${dia}</p>
                <p>${abreviacaoMes}</p>
              </div>
              <p
                class="absolute -top-3 left-24 ${corDaFase} px-3 text-white rounded-xl"
              >
                ${campeonato.fase}
              </p>
              <h3 class="mt-4 uppercase text-xl min-h-[60px]">
                ${campeonato.titulo}
              </h3>
              <p class="text-gray-400 flex gap-2 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                ${campeonato.tipo}
              </p>
              <p class="text-gray-400 flex gap-2 my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                ${campeonato.cidadeEstado}
              </p>
            </div>
            <a
              onclick="verIntegra(${campeonato.id})"
              title="Saiba mais sobre ${campeonato.titulo}"
              class="absolute inset-0"
            ></a>
  `
  const container = document.querySelector(`${conteiner}`);
  article.innerHTML = htmlGerado;
  container.appendChild(article);

}

function gerarIntegra(campeonato)
{
  const container = document.querySelector("#container_integra");
  
   const path = pathServidorCampeonato + `Campeonatos/exibeImagem?arquivo=${campeonato.imagem}`
   const pathFormatado = path.replace(/\\/g, '/');

  htmlGerado = "";
  htmlGerado += `
  <img
  src=${pathFormatado}
  alt="Imagem do torneio"
  class="rounded-md h-[500px] w-full object-cover"
/>
<time datetime="2023-11-21" class="block mt-4 text-gray-500"
  >Terça-feira, 21 de novembro</time
>
<h1
  class="my-1 font-bold text-5xl text-blue-800 flex flex-col lg:flex-row lg:items-center gap-2"
>
  ${campeonato.titulo}
  <span class="text-gray-500 font-normal text-3xl">#${campeonato.codigo}</span>
</h1>
<div class="flex gap-2">
  <p class="text-gray-500 flex gap-2 my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
    ${campeonato.cidadeEstado}
  </p>
  <p class="text-gray-500 flex gap-2 my-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
    ${campeonato.tipo}
  </p>
</div>
<ul
  class="flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200"
>
  <li>
    <h2
      class="inline-block p-4 rounded-t-lg cursor-pointer"
      id="sobre_evento"
      x-on:click="active='sobre_evento'"
      x-bind:class="active=='sobre_evento' ? 'bg-gray-100 rounded-t-lg' : 'hover:text-gray-600 hover:bg-gray-50'"
    >
      <span class="text-blue-700" x-show="active=='sobre_evento'">#</span>
      Sobre o evento
    </h2>
  </li>
  <li>
    <h2
      class="inline-block p-4 rounded-t-lg cursor-pointer"
      id="ginasio"
      x-on:click="active='ginasio'"
      x-bind:class="active=='ginasio' ? 'bg-gray-100 rounded-t-lg' : 'hover:text-gray-600 hover:bg-gray-50'"
    >
      <span class="text-blue-700" x-show="active=='ginasio'">#</span>
      Ginásio
    </h2>
  </li>
  <li>
    <h2
      class="inline-block p-4 rounded-t-lg cursor-pointer"
      id="infos_gerais"
      x-on:click="active='infos_gerais'"
      x-bind:class="active=='infos_gerais' ? 'bg-gray-100 rounded-t-lg' : 'hover:text-gray-600 hover:bg-gray-50'"
    >
      <span class="text-blue-700" x-show="active=='infos_gerais'">#</span>
      Informações gerais
    </h2>
  </li>
  <li>
    <h2
      class="inline-block p-4 rounded-t-lg cursor-pointer"
      id="entrada_publico"
      x-on:click="active='entrada_publico'"
      x-bind:class="active=='entrada_publico' ? 'bg-gray-100 rounded-t-lg' : 'hover:text-gray-600 hover:bg-gray-50'"
    >
      <span class="text-blue-700" x-show="active=='entrada_publico'"
        >#</span
      >
      Entrada ao público
    </h2>
  </li>
</ul>
<article
  class="mt-4 pb-4 border-b border-blue-700/20"
  aria-labelledby="sobre_evento"
  x-show="active=='sobre_evento'"
>
  <div class="mt-4 text-lg">
${campeonato.sobreEvento}
  </div>
</article>
<article
  class="mt-4 pb-4 border-b border-blue-700/20"
  aria-labelledby="ginasio"
  x-show="active=='ginasio'"
>
  <div class="mt-4 text-lg">
${campeonato.ginasio}
  </div>
</article>
<article
  class="mt-4 pb-4 border-b border-blue-700/20"
  aria-labelledby="infos_gerais"
  x-show="active=='infos_gerais'"
>
  <div class="mt-4 text-lg">
  ${campeonato.informacoesGerais}
  </div>
</article>
<article
  class="mt-4 pb-4 border-b border-blue-700/20"
  aria-labelledby="entrada_publico"
  x-show="active=='entrada_publico'"
>
  <div class="mt-4 text-lg">
  ${campeonato.entradaPublico}
  </div>
</article>
<div class="mt-8 flex justify-center">
  <a
    href="./inscricao.html"
    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
  >
    Inscreva-se agora mesmo
  </a>
</div>
<div class="mt-8 flex justify-center">
  <a
    href="./chave_listagem.html"
    class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
  >
    Fique por dentro do chaveamento
  </a>
</div>
<div class="mt-8 flex justify-center">
  <a
    href="./resultados.html"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Veja os resultados
  </a>
</div>
  `

  container.innerHTML = htmlGerado;

}

function obterAbreviacaoMes(numero) {
  const numeroMes = obterMes(numero);
 
  const meses = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];

  if (numeroMes >= 1 && numeroMes <= 12) {
    return meses[numeroMes - 1];
  }

  return null;
}

function obterMes(numero)
{
  const partes = numero.split(" ");
  const data = partes[0]; 
  
  const anoMesDia = data.split("-"); 
  const mes = parseInt(anoMesDia[1], 10);
  
 return mes
  
}

function obterDia(numero)
{
  const partes = numero.split(" ");
  const data = partes[0]; 
  
  const anoMesDia = data.split("-"); 
  const dia = parseInt(anoMesDia[2], 10);
  
 return dia
  
}

function verIntegra(id)
{
  localStorage.setItem('idCampeonato', id);
  window.location.href = `integra.html`;

}