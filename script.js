// ===== ARQUIVO DO POKER - VERSÃO COM PLANILHA =====

// ------------------------------------------------------
// URL DA SUA PLANILHA PUBLICADA (COLE AQUI!)
// ------------------------------------------------------
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThbX0i_1Ph_1b0QqDxUPZg4E2QDG2ulw6sRzQJqmqyVnHaAUdu_LCilhs3go5rS_jwLYJ9sr5IGUSK/pub?gid=0&single=true&output=csv';

// ------------------------------------------------------
// BASE DE DADOS - JOGADORES (MANTÉM FIXO POR ENQUANTO)
// ------------------------------------------------------
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

// ------------------------------------------------------
// FUNÇÃO PARA BUSCAR DADOS DA PLANILHA
// ------------------------------------------------------
async function carregarEventosDaPlanilha() {
    console.log('📥 Buscando eventos da planilha...');
    
    try {
        const response = await fetch(SHEET_URL);
        const csv = await response.text();
        
        // Parse do CSV
        const linhas = csv.split('\n');
        const cabecalho = linhas[0].split(',').map(col => col.replace(/"/g, ''));
        
        // Índices das colunas
        const idxData = cabecalho.findIndex(col => col.includes('data'));
        const idxTorneio = cabecalho.findIndex(col => col.includes('nome_torneio'));
        const idxCampeao = cabecalho.findIndex(col => col.includes('id_campeao'));
        const idxLocal = cabecalho.findIndex(col => col.includes('local_cidade'));
        
        const eventos = [];
        
        // Pular cabeçalho (i = 1)
        for (let i = 1; i < linhas.length; i++) {
            if (!linhas[i].trim()) continue;
            
            // Parse simples (melhorar depois)
            const cols = linhas[i].split(',').map(col => col.replace(/"/g, ''));
            
            const evento = {
                data: cols[idxData] || '',
                torneio: cols[idxTorneio] || '',
                campeaoId: parseInt(cols[idxCampeao]) || 0,
                local: cols[idxLocal] || 'São Paulo'
            };
            
            if (evento.data && evento.torneio) {
                eventos.push(evento);
            }
        }
        
        console.log(`✅ ${eventos.length} eventos carregados da planilha!`);
        return eventos;
        
    } catch (error) {
        console.error('❌ Erro ao carregar planilha:', error);
        return [];
    }
}

// ------------------------------------------------------
// FUNÇÃO PARA EXIBIR OS EVENTOS
// ------------------------------------------------------
async function exibirEventos() {
    // 🔥 GARANTIA: limpa o HTML antes de começar
    document.getElementById('timeline').innerHTML = '<div class="loading">📊 Carregando eventos da planilha...</div>';
    console.log("🚀 Buscando dados...");
    
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '<div class="loading">📊 Carregando eventos da planilha...</div>';
    
    // Carregar da planilha
    const eventos = await carregarEventosDaPlanilha();
    
    if (eventos.length === 0) {
        timeline.innerHTML = '<div class="loading" style="color: #c00;">⚠️ Nenhum evento encontrado. Verifique a planilha.</div>';
        return;
    }
    
    // Ordenar do mais recente para o mais antigo
    eventos.sort((a, b) => b.data.localeCompare(a.data));
    
    timeline.innerHTML = '';
    let anoAtual = '';

    eventos.forEach(evento => {
        const ano = evento.data.split('-')[0];
        
        if (ano !== anoAtual) {
            anoAtual = ano;
            timeline.innerHTML += `<h2 class="ano-divisor">${ano}</h2>`;
        }
        
        const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR');
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
    
    console.log(`✅ Site atualizado com ${eventos.length} eventos da planilha!`);
}

// ------------------------------------------------------
// INICIAR TUDO
// ------------------------------------------------------
exibirEventos();
