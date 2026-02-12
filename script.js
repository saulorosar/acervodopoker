// ===== ARQUIVO DO POKER - VERSÃO SHEET.BEST (CORRIGIDA) =====

// ✅ URL DA SUA API SHEET.BEST (JÁ FUNCIONANDO!)
const API_URL = 'https://api.sheetbest.com/sheets/95640710-3b5b-4842-9423-fbf6ff3346f0';

// ✅ BASE DE JOGADORES (COMPLETA)
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

// ✅ FUNÇÃO PARA BUSCAR DADOS DA API
async function carregarEventos() {
    try {
        console.log('📥 Buscando dados do Sheet.best...');
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const dados = await response.json();
        console.log(`✅ ${dados.length} eventos carregados!`, dados);
        
        // Converter para o formato do seu sistema
        const eventos = dados.map(item => ({
            data: item.data || '',
            torneio: item.nome_torneio || '',
            local: item.local_cidade || 'São Paulo',
            campeaoId: parseInt(item.id_time) || 0  // ⚠️ IMPORTANTE: aqui é id_time, NÃO id_campeao!
        }));
        
        return eventos;
        
    } catch (error) {
        console.error('❌ Erro ao carregar:', error);
        return [];
    }
}

// ✅ FUNÇÃO PARA EXIBIR OS EVENTOS
async function exibirEventos() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '<div class="loading">📊 Carregando acervo histórico...</div>';
    
    const eventos = await carregarEventos();
    
    if (eventos.length === 0) {
        timeline.innerHTML = '<div class="loading">⚠️ Nenhum evento encontrado</div>';
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
            timeline.innerHTML += `<h2 class="ano-divisor">📅 ${ano}</h2>`;
        }
        
        // Formatar data
        const dataObj = new Date(evento.data + 'T12:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        
        // Nome do jogador (ATENÇÃO: usa id_time, NÃO campeaoId!)
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

// ✅ INICIAR QUANDO A PÁGINA CARREGAR
exibirEventos();
