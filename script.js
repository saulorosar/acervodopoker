// ===== ARQUIVO DO POKER - DADOS E FUNÇÕES =====

// ------------------------------------------------------
// BASE DE DADOS - JOGADORES
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
// BASE DE DADOS - EVENTOS
// ------------------------------------------------------
const eventos = [
    { data: "2025-02-27", torneio: "Super Segunda", local: "São Paulo", campeaoId: 40 },
    { data: "2025-01-09", torneio: "Super", local: "São Paulo", campeaoId: 5 },
    { data: "2025-01-06", torneio: "Super Segunda", local: "São Paulo", campeaoId: 1 },
    { data: "2025-01-03", torneio: "Super Sexta", local: "São Paulo", campeaoId: 11 },
    { data: "2025-01-02", torneio: "Super Quinta", local: "São Paulo", campeaoId: 1 },
    { data: "2025-01-01", torneio: "Super Quarta", local: "São Paulo", campeaoId: 44 },
    { data: "2024-12-13", torneio: "Desafio de Domingo", local: "São Paulo", campeaoId: 12 },
    { data: "2024-12-13", torneio: "Desafio de Sábado", local: "São Paulo", campeaoId: 12 },
    { data: "2024-12-13", torneio: "Desafio de Terça", local: "São Paulo", campeaoId: 21 },
    { data: "2024-12-12", torneio: "Super Sexta", local: "São Paulo", campeaoId: 11 },
    { data: "2023-05-30", torneio: "Torneio de Maio", local: "São Paulo", campeaoId: 1 },
    { data: "2023-04-25", torneio: "Torneio de Abril", local: "São Paulo", campeaoId: 10 },
    { data: "2023-03-10", torneio: "Torneio de Março", local: "São Paulo", campeaoId: 7 },
    { data: "2023-02-20", torneio: "Torneio de Fevereiro", local: "São Paulo", campeaoId: 4 },
    { data: "2023-01-15", torneio: "Torneio de Janeiro", local: "São Paulo", campeaoId: 7 }
];

// ------------------------------------------------------
// FUNÇÃO PARA EXIBIR OS EVENTOS
// ------------------------------------------------------
function exibirEventos() {
    console.log("🚀 Função exibirEventos() executada!");
    console.log("📊 Total de eventos:", eventos.length);
    
    const timeline = document.getElementById('timeline');
    if (!timeline) {
        console.error("❌ Elemento #timeline não encontrado!");
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
    
    console.log("✅ Eventos exibidos com sucesso!");
}

// ------------------------------------------------------
// EXECUTAR QUANDO A PÁGINA CARREGAR
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', exibirEventos);
