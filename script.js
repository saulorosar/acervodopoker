// ===== ARQUIVO DO POKER - LEITOR DE PLANILHA HTML =====

// ------------------------------------------------------
// URL DA SUA PLANILHA PUBLICADA (ABA EVENTOS)
// ------------------------------------------------------
const PLANILHA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThbX0i_1Ph_1b0QqDxUPZg4E2QDG2ulw6sRzQJqmqyVnHaAUdu_LCilhs3go5rS_jwLYJ9sr5IGUSK/pubhtml?gid=0&single=true';

// ------------------------------------------------------
// BASE DE DADOS - JOGADORES (FIXA POR ENQUANTO)
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
// FUNÇÃO PARA BUSCAR E EXTRAIR DADOS DA PLANILHA HTML
// ------------------------------------------------------
async function carregarEventosDaPlanilha() {
    console.log('📥 Acessando planilha publicada...');
    
    try {
        // 1. Buscar o HTML da planilha
        const response = await fetch(PLANILHA_URL);
        const html = await response.text();
        
        console.log('📄 HTML carregado, processando tabela...');
        
        // 2. Encontrar a tabela de dados
        const tabelaMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
        if (!tabelaMatch) {
            throw new Error('Tabela não encontrada no HTML');
        }
        
        const tabela = tabelaMatch[1];
        
        // 3. Extrair linhas da tabela
        const linhas = tabela.split(/<\/tr>/i);
        const eventos = [];
        
        // Pular cabeçalho (primeira linha)
        for (let i = 1; i < linhas.length; i++) {
            const linha = linhas[i];
            if (!linha.includes('<td')) continue;
            
            // Extrair células
            const celulas = linha.split(/<td[^>]*>/i);
            
            // Limpar tags HTML e obter texto puro
            const dados = celulas.map(celula => {
                const texto = celula.replace(/<[^>]+>/g, '').trim();
                return texto.replace(/\s+/g, ' '); // Remove espaços extras
            });
            
            // Acessar colunas específicas (baseado na ordem do seu cabeçalho)
            // Índices ajustados após split do <td>
            if (dados.length >= 11) {
                const evento = {
                    id: dados[1] || '',
                    data: dados[2] || '',
                    nome_torneio: dados[3] || '',
                    serie: dados[4] || '',
                    buyin: dados[5] || '',
                    participantes: dados[6] || '',
                    premio: dados[7] || '',
                    local_cidade: dados[8] || 'São Paulo',
                    local_pais: dados[9] || 'Brasil',
                    id_campeao: parseInt(dados[8]) || 0,
                    id_time: parseInt(dados[11]) || 1,
                    id_patrocinador: dados[12] || ''
                };
                
                // Só adicionar se tiver data e nome do torneio
                if (evento.data && evento.nome_torneio) {
                    eventos.push(evento);
                }
            }
        }
        
        console.log(`✅ ${eventos.length} eventos extraídos da planilha!`);
        return eventos;
        
    } catch (error) {
        console.error('❌ Erro ao carregar planilha:', error);
        return [];
    }
}

// ------------------------------------------------------
// FUNÇÃO PARA EXIBIR OS EVENTOS NO SITE
// ------------------------------------------------------
async function exibirEventos() {
    const timeline = document.getElementById('timeline');
    if (!timeline) {
        console.error('❌ Elemento #timeline não encontrado!');
        return;
    }
    
    timeline.innerHTML = '<div class="loading">📊 Carregando acervo histórico...</div>';
    
    const eventos = await carregarEventosDaPlanilha();
    
    if (eventos.length === 0) {
        timeline.innerHTML = `
            <div class="loading" style="color: #666; text-align: left;">
                ⚠️ Nenhum evento encontrado na planilha.<br>
                <small>Verifique se a aba "eventos" está publicada e contém dados.</small>
            </div>
        `;
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
            timeline.innerHTML += `<h2 class="ano-divisor">🏆 ${ano}</h2>`;
        }
        
        // Formatar data
        const dataObj = new Date(evento.data + 'T12:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Nome do jogador
        const nomeJogador = jogadores[evento.id_campeao] || `Jogador #${evento.id_campeao}`;
        
        // Nome do torneio
        const titulo = evento.nome_torneio || evento.serie || 'Torneio';
        
        timeline.innerHTML += `
            <div class="evento">
                <div class="data">${dataFormatada}</div>
                <div class="titulo-evento">${titulo}</div>
                <div class="jogador">
                    🏆 ${nomeJogador}
                    <span class="time">Vip Poker Club</span>
                </div>
                <div class="detalhes">
                    📍 ${evento.local_cidade || 'São Paulo'}, ${evento.local_pais || 'Brasil'}
                    ${evento.premio ? ` • 💰 R$ ${parseInt(evento.premio).toLocaleString('pt-BR')}` : ''}
                </div>
            </div>
        `;
    });
    
    console.log(`🎉 Site atualizado com ${eventos.length} eventos!`);
}

// ------------------------------------------------------
// INICIAR QUANDO A PÁGINA CARREGAR
// ------------------------------------------------------
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', exibirEventos);
} else {
    exibirEventos();
}
