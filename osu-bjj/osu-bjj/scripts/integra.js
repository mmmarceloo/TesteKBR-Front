const idCampeonato = localStorage.getItem('idCampeonato')
// Solicitação GET para o endpoint que busca todos os campeonatos
const path = pathServidorCampeonato + "Campeonatos/buscar-campeonato/" + idCampeonato;
fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível obter a lista de campeonatos.');
        }
        return response.json();
    })
    .then(data => {
        totalRegistros = data.totalCampeonatos;
        const campeonatos = data.campeonatos;
        gerarIntegra(data)
    })
    .catch(error => {
        console.error('Erro ao buscar a lista de campeonatos:', error);
        document.getElementById("loading-spinner").style.display = "none";
    });