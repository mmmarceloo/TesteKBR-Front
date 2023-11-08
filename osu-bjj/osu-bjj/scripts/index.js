// Solicitação GET para o endpoint que busca todos os campeonatos
const path = pathServidorCampeonato + "campeonatos/todos";
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
        criarCardDinamicamente(campeonatos)
    })
    .catch(error => {
        console.error('Erro ao buscar a lista de campeonatos:', error);
        document.getElementById("loading-spinner").style.display = "none";
    });