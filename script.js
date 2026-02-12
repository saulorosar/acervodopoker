// ===== ARQUIVO DO POKER - VERSÃO CSV CONFIRMADA =====

// URL do CSV (QUE JÁ ESTÁ FUNCIONANDO!)
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThbX0i_1Ph_1b0QqDxUPZg4E2QDG2ulw6sRzQJqmqyVnHaAUdu_LCilhs3go5rS_jwLYJ9sr5IGUSK/pubhtml?gid=0&single=true';

// BASE DE JOGADORES
const jogadores = {
    1: "João", 2: "Maria", 3: "Carlos", 4: "Saulo", 5: "Fran",
    6: "Cleber", 7: "Vanessa", 8: "Marcos", 9: "Helio",
    10: "José Belarmino (Sr. Zé)", 11: "Carlos Augusto", 12: "Dr. Geraldo Garcia",
    13: "Adriano Lindner", 14: "Marcos H. (Santista)", 15: "Mauricio Diaz",
    16: "Dennis Reserva", 17: "Ailton Alves", 18: "Jonathan Santos",
    19: "Rogério Gold", 20: "Sergio Scopel", 21: "Alcir Notari",
    22: "Anderson Moraes", 23: "João Junior", 24: "Alessandre Iba",
    25: "Anderson Barros", 26: "Luiz H. (Henrique Brito)", 27: "Leniton Bronze",
    28: "Cristian Rico", 29: "Leonardo Cruz", 30: "Luiz Ezequiel (Zico)",
    31: "Claudio Molina", 32: "Rodrigo Pressoto", 33: "Paulo Roberto",
    34: "Atair Pissaia", 35: "Marion Susin", 36: "Paulo Cesar Kauer",
    37: "Leonardo Scalabrin", 38: "Vilson Rodrigues", 39: "Sergio Monteiro",
    40: "Hamilton Junior", 41: "Mayckon Cardoso", 42: "Arthur Oliveira",
    43: "José Macedo", 44: "João Carlos Grando", 45: "Juliano Ortiz",
    46: "Adilson Just", 47: "Marcello Fernandes", 48: "Geanfrancesco Pereira",
    49: "Djeik Williams", 50: "Ricardo Piva", 51: "Celio Reis",
    52: "Aura de Melo", 53: "Luciano Pancich", 54: "Alcenor Mocelin",
    55: "Diego Nardini", 56: "Artur Rocha", 57: "Alex Gaspar",
    58: "Reiner Weihermann", 59: "Mauro Santos"
};

// FUNÇÃO PARA BUSCAR CSV
async function carregarEventos() {
    try {
        console.log('📥 Baixando CSV...');
        const response = await fetch(CSV_URL);
        const csv = await response.text();
        
        // Divide em linhas
        const linhas = csv.split('\n');
        const eventos = [];
        
        // Pula cabeçalho (linha 1)
        for (let i = 1; i < linhas.length; i++) {
            if (!linhas[i].trim()) continue;
            
            // Divide as colunas
            const cols = linhas[i].split(',').map(col => col.replace(/"/g, '').trim());
            
            // ÍNDICES CORRETOS baseados no seu cabeçalho:
            // 0:id_evento, 1:data, 2:nome_torneio, 3:serie, 4:buyin, 5:participantes,
            // 6:premio_primeiro, 7:local_cidade, 8:id_campeao, 9:id_time, 10:id_patrocinador, etc...
            
            const evento = {
                data: cols[1] || '',
                torneio: cols[2] || '',
                local: cols[7] || 'São Paulo',
                campeaoId: parseInt(cols[8]) || 0  // ✅ ÍNDICE 8 = id_campeao!
            };
            
            if (evento.data && evento.torneio) {
                eventos.push(evento);
            }
        }
        
        console.log(`✅ ${eventos.length} eventos carregados!`);
        return eventos;
        
    } catch (error) {
        console.error('❌ Erro:', error);
        return [];
    }
}

// FUNÇÃO PARA EXIBIR
async function exibirEventos() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '<div class="loading">📊 Carregando acervo...</div>';
    
    const eventos = await carregarEventos();
    
    if (eventos.length === 0) {
        timeline.innerHTML = '<div class="loading">⚠️ Nenhum evento encontrado</div>';
        return;
    }
    
    // Ordenar
    eventos.sort((a, b) => b.data.localeCompare(a.data));
    
    timeline.innerHTML = '';
    let anoAtual = '';
    
    eventos.forEach(evento => {
        const ano = evento.data.split('-')[0];
        
        if (ano !== anoAtual) {
            anoAtual = ano;
            timeline.innerHTML += `<h2 class="ano-divisor">${ano}</h2>`;
        }
        
        // Formatar data
        const dataObj = new Date(evento.data + 'T12:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        
        // Nome do jogador
        const nomeJogador = jogadores[evento.campeaoId] || `Jogador #${evento.campeaoId}`;
        
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

// INICIAR
exibirEventos();
