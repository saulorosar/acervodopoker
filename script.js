// ===== ARQUIVO DO POKER - SHEET.BEST PURO =====
const API_URL = 'https://api.sheetbest.com/sheets/95640710-3b5b-4842-9423-fbf6ff3346f0';

const jogadores = {
     1: "Pedro", 2: "Ana", 3: "Lucas", 4: "Rafael", 5: "G",
 6: "Bruno", 7: "Camila", 8: "Thiago", 9: "Fernando",
 10: "Antônio Silva (Sr. Toninho)", 11: "Felipe Augusto", 12: "Dr. Henrique Almeida",
 13: "Eduardo Martins", 14: "Ricardo L. (Carioca)", 15: "Gustavo Mendes",
 16: "Daniel Costa", 17: "Roberto Lima", 18: "Matheus Oliveira",
 19: "Fábio Goldmann", 20: "Marcelo Souza", 21: "Cláudio Ferreira",
 22: "André Moraes", 23: "Paulo Junior", 24: "Alexandre Batista",
 25: "Renato Barros", 26: "Luiz Felipe (Felipinho)", 27: "Henrique Prado",
 28: "Cristiano Duarte", 29: "Leonardo Farias", 30: "Luiz Gustavo (Guga)",
 31: "Claudio Ribeiro", 32: "Rodrigo Almeida", 33: "Paulo Henrique",
 34: "Althair Costa", 35: "Mariana Souza", 36: "Paulo Cesar Andrade",
 37: "Leonardo Teixeira", 38: "Wilson Rodrigues", 39: "Sergio Carvalho",
 40: "Hugo Nascimento", 41: "Maicon Cardoso", 42: "Arthur Mendes",
 43: "José Ricardo", 44: "João Pedro Almeida", 45: "Juliano Castro",
 46: "Adriano Justino", 47: "Marcelo Fernandes", 48: "Giovanni Pereira",
 49: "Derek Williams", 50: "Ricardo Antunes", 51: "Célio Martins",
 52: "Laura de Melo", 53: "Luciano Pacheco", 54: "Alcides Moreira",
 55: "Diego Fernandes", 56: "Artur Lopes", 57: "Alexandre Gaspar",
 58: "Reinaldo Weber", 59: "Maurício Santos"
};

async function carregarEventos() {
    try {
        const response = await fetch(API_URL);
        const dados = await response.json();
        
        return dados.map(item => ({
            data: item.data || '',
            torneio: item.nome_torneio || '',
            local: item.local_cidade || 'São Paulo',
            jogadorId: parseInt(item.id_time) || 0
        }));
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

async function exibirEventos() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '<div class="loading">📊 Carregando...</div>';
    
    const eventos = await carregarEventos();
    
    if (eventos.length === 0) {
        timeline.innerHTML = '<div class="loading">⚠️ Nenhum evento</div>';
        return;
    }
    
    eventos.sort((a, b) => b.data.localeCompare(a.data));
    
    timeline.innerHTML = '';
    let anoAtual = '';
    
    eventos.forEach(evento => {
        const ano = evento.data.split('-')[0];
        
        if (ano !== anoAtual) {
            anoAtual = ano;
            timeline.innerHTML += `<h2 class="ano-divisor">📅 ${ano}</h2>`;
        }
        
        const dataObj = new Date(evento.data + 'T12:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        const nomeJogador = jogadores[evento.jogadorId] || `Jogador #${evento.jogadorId}`;
        
        timeline.innerHTML += `
            <div class="evento">
                <div class="data">${dataFormatada}</div>
                <div class="titulo-evento">${evento.torneio}</div>
                <div class="jogador">
                    🏆 ${nomeJogador}
                    <span class="time">Vip Poker Club</span>
                </div>
                <div class="detalhes">📍 ${evento.local}</div>
            </div>
        `;
    });
}

exibirEventos();
