// ============================================================
// REGRAS GRAFO "g-santos"
// Muda um número aqui, o build e o motor obedecem sozinhos.
// (antes vivia em regras-grafo.js — agora mora aqui, no mesmo
// arquivo dos dados, pra motor/página buscarem tudo numa fetch só)
// ============================================================
var regrasDoGrafo = {
  // Traduz "papel" -> nome real do campo na base deste grafo
  dicionario: {
    chaveOrdenacao: 'ano',        // campo usado pra ordenar dentro do nível
    agrupamento: 'categoria',     // campo que separa em fileiras diferentes
    mesReferencia: 'mesNumero'    // campo do nó de mês que dá o número do mês
  },
// Números de layout
  layout: {
// nosPorFileira: 20,           // [DESATIVADO pois nao tem sentido mexer aqui, mas usar o default que esta no calcular grafo] valor antigo — comente/descomente pra voltar a 20. Sem essa chave, o sistema usa o padrão genérico (16).
// minimoAntesQuebraSeculo: 10, // [DESATIVADO] valor antigo — junto com a linha acima, controlava o limiar de quebra entre grupos/século.
    alturaPorFileira: 150,
    numLinhasInternas: 2,
    usaQuebraPorEpoca: true       // se false, ignora século e só quebra por 20/16
  },
  // Cores fixas tudo na paleta automatica, nenhuma regra especifica
  cores: {}
};













var todosNos = [
    // ========== NÍVEL 1: SISTEMAS DE CLASSIFICAÇÃO E TEMPO ==========
    // Categoria: Ideia (Títulos) — linhas calculadas automaticamente
    { id: '50', level: 1, categoria: 'ideia', label: 'MÁRTIR', grupo: 'ideia', font: { color: '#ffaaaa', size: 13, bold: true } },
    { id: '51', level: 1, categoria: 'ideia', label: 'DOUTOR', grupo: 'ideia', font: { color: '#ffffaa', size: 13, bold: true } },
    { id: '52', level: 1, categoria: 'ideia', label: 'VIRGEM', grupo: 'ideia', font: { color: '#ffffff', size: 13, bold: true } },
    { id: '53', level: 1, categoria: 'ideia', label: 'CONFESSOR', grupo: 'ideia', font: { color: '#aaffaa', size: 13, bold: true } },
    { id: '54', level: 1, categoria: 'ideia', label: 'PENITENTE', grupo: 'ideia', font: { color: '#e6b3ff', size: 13, bold: true } },
    { id: '56', level: 1, categoria: 'ideia', label: 'PAPA', grupo: 'ideia', font: { color: '#ffd700', size: 13, bold: true } },
    { id: '57', level: 1, categoria: 'ideia', label: 'BISPO', grupo: 'ideia', font: { color: '#dca3ff', size: 13, bold: true } },
    { id: '59', level: 1, categoria: 'ideia', label: 'ABADE', grupo: 'ideia', font: { color: '#ffb366', size: 13, bold: true } },
    { id: '60', level: 1, categoria: 'ideia', label: 'VIÚVA', grupo: 'ideia', font: { color: '#ff99cc', size: 13, bold: true } },
    { id: '58', level: 1, categoria: 'ideia', label: 'ARCANJO', grupo: 'ideia', font: { color: '#a3e4ff', size: 13, bold: true } },
    { id: '849', level: 1, categoria: 'ideia', label: 'APÓSTOLOS', grupo: 'ideia', font: { color: '#a3e4ff', size: 13, bold: true } },
    
    // Categoria: Documento (Meses) — linhas calculadas automaticamente
{ id: '70', level: 1, categoria: 'documento', label: 'JANEIRO', grupo: 'documento', mesNumero: 1, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '80', level: 1, categoria: 'documento', label: 'FEVEREIRO', grupo: 'documento', mesNumero: 2, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '90', level: 1, categoria: 'documento', label: 'MARÇO', grupo: 'documento', mesNumero: 3, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '91', level: 1, categoria: 'documento', label: 'ABRIL', grupo: 'documento', mesNumero: 4, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '92', level: 1, categoria: 'documento', label: 'MAIO', grupo: 'documento', mesNumero: 5, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '93', level: 1, categoria: 'documento', label: 'JUNHO', grupo: 'documento', mesNumero: 6, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '94', level: 1, categoria: 'documento', label: 'JULHO', grupo: 'documento', mesNumero: 7, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '95', level: 1, categoria: 'documento', label: 'AGOSTO', grupo: 'documento', mesNumero: 8, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '96', level: 1, categoria: 'documento', label: 'SETEMBRO', grupo: 'documento', mesNumero: 9, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '97', level: 1, categoria: 'documento', label: 'OUTUBRO', grupo: 'documento', mesNumero: 10, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '98', level: 1, categoria: 'documento', label: 'NOVEMBRO', grupo: 'documento', mesNumero: 11, font: { color: '#ffffff', size: 14, bold: true } },
{ id: '99', level: 1, categoria: 'documento', label: 'DEZEMBRO', grupo: 'documento', mesNumero: 12, font: { color: '#ffffff', size: 14, bold: true } },


    // ========== NÍVEL 2: SANTOS BÍBLICOS / FUNDADORES (26 nós -> corta em f0 e f1) ==========
    { id: '4',   level: 2, label: 'S. José', grupo: 'pessoa', ano: 30, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '71',  level: 2, label: 'S. João Batista', grupo: 'pessoa', ano: 29, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '2',   level: 2, label: 'S. Pedro', grupo: 'pessoa', ano: 67, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '3',   level: 2, label: 'S. Paulo', grupo: 'pessoa', ano: 67, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '55',  level: 2, label: 'S. João', grupo: 'pessoa', ano: 100, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '86',  level: 2, label: 'S. Matias', grupo: 'pessoa', ano: 80, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '110', level: 2, label: 'S. André', grupo: 'pessoa', ano: 60, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '111', level: 2, label: 'S. Tiago Maior', grupo: 'pessoa', ano: 44, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '112', level: 2, label: 'S. Filipe', grupo: 'pessoa', ano: 80, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '113', level: 2, label: 'S. Bartolomeu', grupo: 'pessoa', ano: 71, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '114', level: 2, label: 'S. Tomé', grupo: 'pessoa', ano: 72, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '115', level: 2, label: 'S. Mateus', grupo: 'pessoa', ano: 74, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '116', level: 2, label: 'S. Tiago Menor', grupo: 'pessoa', ano: 62, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '117', level: 2, label: 'S. Tadeu', grupo: 'pessoa', ano: 70, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '118', level: 2, label: 'S. Simão', grupo: 'pessoa', ano: 65, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '228', level: 2, label: 'S. Barnabé', grupo: 'pessoa', ano: 61, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '215', level: 2, label: 'Sta. Maria Madalena', grupo: 'pessoa', ano: 63, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '218', level: 2, label: 'Sta. Ana', grupo: 'pessoa', ano: 10, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '221', level: 2, label: 'Sta. Marta', grupo: 'pessoa', ano: 80, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '412', level: 2, label: 'S. Timóteo', grupo: 'pessoa', ano: 97, font: { color: '#ffffff', size: 14, bold: true } },
    // Quebra para > 20
    { id: '418', level: 2, label: 'S. Tito', grupo: 'pessoa', ano: 96, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '424', level: 2, label: 'N. Sra. de Lourdes', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '439', level: 2, label: 'S. Gabriel Arcanjo', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '440', level: 2, label: 'N. Sra. da Anunciação', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '441', level: 2, label: 'N. Sra. das Sete Dores', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '453', level: 2, label: 'S. Marcos Evangelista', grupo: 'pessoa', ano: 68, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '603', level: 2, label: 'S. Miguel Arcanjo', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '630', level: 2, label: 'Sto. Estêvão, Protomártir', grupo: 'pessoa', ano: 36, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '631', level: 2, label: 'N. Sra. das Neves', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '632', level: 2, label: 'Transfiguração do Senhor', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '638', level: 2, label: 'Assunção de Maria', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '639', level: 2, label: 'S. Joaquim', grupo: 'pessoa', ano: 10, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '644', level: 2, label: 'Imaculado Coração', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '680', level: 2, label: 'S. Lucas Evangelista', grupo: 'pessoa', ano: 84, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '685', level: 2, label: 'S. Rafael Arcanjo', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '718', level: 2, label: 'Santos Inocentes', grupo: 'pessoa', ano: 4, font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 3: ANTIGUIDADE (Séc I ao V) (nós — linhas calculadas automaticamente) ==========
    { id: '73', level: 3, label: 'Sta. Inês', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '72', level: 3, label: 'S. Sebastião', grupo: 'pessoa', ano: 288, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '7',  level: 3, label: 'S. Jorge', grupo: 'pessoa', ano: 303, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '76', level: 3, label: 'S. Paulo Eremita', grupo: 'pessoa', ano: 341, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '74', level: 3, label: 'S. Antão', grupo: 'pessoa', ano: 356, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '64', level: 3, label: 'Sta. Mônica', grupo: 'pessoa', ano: 387, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '5',  level: 3, label: 'S. Agostinho', grupo: 'pessoa', ano: 430, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '81', level: 3, label: 'S. Inácio de Antioquia', grupo: 'pessoa', ano: 107, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '82', level: 3, label: 'S. Brás', grupo: 'pessoa', ano: 316, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '83', level: 3, label: 'Sta. Águeda', grupo: 'pessoa', ano: 251, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '84', level: 3, label: 'S. Valentim', grupo: 'pessoa', ano: 269, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '204', level: 3, label: '7 Irmãos, Rufina e Secunda', grupo: 'pessoa', ano: 257, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '205', level: 3, label: 'S. Pio I', grupo: 'pessoa', ano: 154, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '207', level: 3, label: 'S. Anacleto', grupo: 'pessoa', ano: 92, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '210', level: 3, label: 'Sto. Aleixo', grupo: 'pessoa', ano: 412, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '214', level: 3, label: 'Sta. Práxedes', grupo: 'pessoa', ano: 165, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '216', level: 3, label: 'Sto. Apolinário', grupo: 'pessoa', ano: 79, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '217', level: 3, label: 'Sta. Cristina', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '219', level: 3, label: 'S. Pantaleão', grupo: 'pessoa', ano: 305, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '220', level: 3, label: 'Nazário e Celso', grupo: 'pessoa', ano: 68, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '222', level: 3, label: 'Abdon e Sennen', grupo: 'pessoa', ano: 250, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '223', level: 3, label: 'Marcelino, Pedro e Erasmo', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '226', level: 3, label: 'Primo e Feliciano', grupo: 'pessoa', ano: 297, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '229', level: 3, label: 'S. Basílio Magno', grupo: 'pessoa', ano: 379, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '230', level: 3, label: 'Vito, Modesto e Crescência', grupo: 'pessoa', ano: 303, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '231', level: 3, label: 'Sto. Efrém', grupo: 'pessoa', ano: 373, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '233', level: 3, label: 'Gervásio e Protásio', grupo: 'pessoa', ano: 165, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '236', level: 3, label: 'S. Paulino de Nola', grupo: 'pessoa', ano: 431, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '237', level: 3, label: 'João e Paulo', grupo: 'pessoa', ano: 362, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '239', level: 3, label: 'Sto. Irineu', grupo: 'pessoa', ano: 202, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '400', level: 3, label: 'S. Higino', grupo: 'pessoa', ano: 142, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '401', level: 3, label: 'S. Hilário de Poitiers', grupo: 'pessoa', ano: 367, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '402', level: 3, label: 'S. Félix de Nola', grupo: 'pessoa', ano: 256, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '404', level: 3, label: 'S. Marcelo I', grupo: 'pessoa', ano: 309, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '405', level: 3, label: 'Sta. Prisca', grupo: 'pessoa', ano: 269, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '406', level: 3, label: 'Mário, Marta, Audifax e Abaco', grupo: 'pessoa', ano: 270, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '408', level: 3, label: 'S. Fabiano', grupo: 'pessoa', ano: 250, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '409', level: 3, label: 'Vicente e Anastácio', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '411', level: 3, label: 'Sta. Emerenciana', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '413', level: 3, label: 'S. Policarpo', grupo: 'pessoa', ano: 155, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '414', level: 3, label: 'S. João Crisóstomo', grupo: 'pessoa', ano: 407, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '416', level: 3, label: 'Sta. Martinha', grupo: 'pessoa', ano: 228, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '419', level: 3, label: 'Sta. Dorotéia', grupo: 'pessoa', ano: 311, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '422', level: 3, label: 'S. Cirilo de Alexandria', grupo: 'pessoa', ano: 444, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '423', level: 3, label: 'Sta. Apolônia', grupo: 'pessoa', ano: 249, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '426', level: 3, label: 'Faustino e Jovita', grupo: 'pessoa', ano: 120, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '427', level: 3, label: 'S. Simeão', grupo: 'pessoa', ano: 107, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '431', level: 3, label: 'S. Lúcio I', grupo: 'pessoa', ano: 254, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '432', level: 3, label: 'Perpétua e Felicidade', grupo: 'pessoa', ano: 203, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '435', level: 3, label: 'Quarenta Mártires', grupo: 'pessoa', ano: 320, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '438', level: 3, label: 'S. Cirilo de Jerusalém', grupo: 'pessoa', ano: 386, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '445', level: 3, label: 'S. Leão Magno', grupo: 'pessoa', ano: 461, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '447', level: 3, label: 'S. Justino', grupo: 'pessoa', ano: 165, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '448', level: 3, label: 'Tibúrcio, Valeriano e Máximo', grupo: 'pessoa', ano: 229, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '449', level: 3, label: 'S. Aniceto', grupo: 'pessoa', ano: 168, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '451', level: 3, label: 'Sotero e Caio', grupo: 'pessoa', ano: 296, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '454', level: 3, label: 'Cleto e Marcelino', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '457', level: 3, label: 'S. Vital', grupo: 'pessoa', ano: 62, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '600', level: 3, label: 'Sto. Atanásio', grupo: 'pessoa', ano: 373, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '604', level: 3, label: 'S. Gregório Nazianzeno', grupo: 'pessoa', ano: 390, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '606', level: 3, label: 'Gordiano e Epímaco', grupo: 'pessoa', ano: 362, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '607', level: 3, label: 'Nereu, Aquileu, Domitila...', grupo: 'pessoa', ano: 100, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '613', level: 3, label: 'S. Venâncio', grupo: 'pessoa', ano: 250, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '615', level: 3, label: 'Sta. Pudenciana', grupo: 'pessoa', ano: 160, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '618', level: 3, label: 'S. Urbano I', grupo: 'pessoa', ano: 230, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '620', level: 3, label: 'S. Eleutério', grupo: 'pessoa', ano: 189, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '625', level: 3, label: 'S. Félix I', grupo: 'pessoa', ano: 274, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '628', level: 3, label: 'Sta. Petronila', grupo: 'pessoa', ano: 90, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '634', level: 3, label: 'Ciríaco, Largo e Esmaragdo', grupo: 'pessoa', ano: 303, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '635', level: 3, label: 'S. Lourenço', grupo: 'pessoa', ano: 258, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '636', level: 3, label: 'Tibúrcio e Susana', grupo: 'pessoa', ano: 295, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '637', level: 3, label: 'Hipólito e Cassiano', grupo: 'pessoa', ano: 235, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '641', level: 3, label: 'S. Agapito', grupo: 'pessoa', ano: 274, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '647', level: 3, label: 'S. Zeferino', grupo: 'pessoa', ano: 217, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '652', level: 3, label: 'Doze Santos Irmãos', grupo: 'pessoa', ano: 303, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '655', level: 3, label: 'S. Gorgônio', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '657', level: 3, label: 'Proto e Jacinto', grupo: 'pessoa', ano: 257, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '658', level: 3, label: 'Cornélio e Cipriano', grupo: 'pessoa', ano: 258, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '660', level: 3, label: 'S. Januário e Comp.', grupo: 'pessoa', ano: 305, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '661', level: 3, label: 'Eustáquio e Comp.', grupo: 'pessoa', ano: 118, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '663', level: 3, label: 'S. Maurício e Comp.', grupo: 'pessoa', ano: 287, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '664', level: 3, label: 'S. Lino', grupo: 'pessoa', ano: 76, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '665', level: 3, label: 'Cipriano e Justina', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '666', level: 3, label: 'Cosme e Damião', grupo: 'pessoa', ano: 287, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '668', level: 3, label: 'S. Jerônimo', grupo: 'pessoa', ano: 420, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '674', level: 3, label: 'Dionísio, Rústico e Eleutério', grupo: 'pessoa', ano: 258, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '677', level: 3, label: 'S. Calisto I', grupo: 'pessoa', ano: 222, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '683', level: 3, label: 'S. Hilarião', grupo: 'pessoa', ano: 371, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '684', level: 3, label: 'Sta. Úrsula e Comp.', grupo: 'pessoa', ano: 383, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '686', level: 3, label: 'Crisanto e Daria', grupo: 'pessoa', ano: 283, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '687', level: 3, label: 'S. Evaristo', grupo: 'pessoa', ano: 105, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '690', level: 3, label: 'Quatro Coroados', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '691', level: 3, label: 'S. Teodoro', grupo: 'pessoa', ano: 306, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '693', level: 3, label: 'S. Martinho de Tours', grupo: 'pessoa', ano: 397, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '699', level: 3, label: 'S. Gregório Taumaturgo', grupo: 'pessoa', ano: 270, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '701', level: 3, label: 'Sta. Cecília', grupo: 'pessoa', ano: 230, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '702', level: 3, label: 'S. Clemente I', grupo: 'pessoa', ano: 99, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '703', level: 3, label: 'Sta. Felicidade', grupo: 'pessoa', ano: 165, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '704', level: 3, label: 'S. Crisógono', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '705', level: 3, label: 'Sta. Catarina de Alexandria', grupo: 'pessoa', ano: 305, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '707', level: 3, label: 'S. Pedro de Alexandria', grupo: 'pessoa', ano: 311, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '708', level: 3, label: 'S. Saturnino', grupo: 'pessoa', ano: 250, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '709', level: 3, label: 'Sta. Bibiana', grupo: 'pessoa', ano: 363, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '710', level: 3, label: 'S. Pedro Crisólogo', grupo: 'pessoa', ano: 450, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '712', level: 3, label: 'S. Nicolau', grupo: 'pessoa', ano: 343, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '713', level: 3, label: 'Sto. Ambrósio', grupo: 'pessoa', ano: 397, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '714', level: 3, label: 'S. Melquíades', grupo: 'pessoa', ano: 314, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '715', level: 3, label: 'S. Dâmaso I', grupo: 'pessoa', ano: 384, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '716', level: 3, label: 'Sta. Luzia', grupo: 'pessoa', ano: 304, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '720', level: 3, label: 'S. Silvestre I', grupo: 'pessoa', ano: 335, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '717', level: 3, label: 'S. Eusébio de Vercelli', grupo: 'pessoa', ano: 371, font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 4: IDADE MÉDIA (Séc VI ao XV) (nós — linhas calculadas automaticamente) ==========
    { id: '6',  level: 4, label: 'S. Bento', grupo: 'pessoa', ano: 547, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '85', level: 4, label: 'Sta. Escolástica', grupo: 'pessoa', ano: 543, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '66', level: 4, label: 'S. Bernardo', grupo: 'pessoa', ano: 1153, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '8',  level: 4, label: 'S. Francisco', grupo: 'pessoa', ano: 1226, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '11', level: 4, label: 'Sta. Clara', grupo: 'pessoa', ano: 1253, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '9',  level: 4, label: 'S. Domingos', grupo: 'pessoa', ano: 1221, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '10', level: 4, label: 'S. Tomás de Aquino', grupo: 'pessoa', ano: 1274, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '65', level: 4, label: 'Sto. Antônio', grupo: 'pessoa', ano: 1231, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '67', level: 4, label: 'Sta. Rita', grupo: 'pessoa', ano: 1457, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '200', level: 4, label: 'S. Leão II', grupo: 'pessoa', ano: 683, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '202', level: 4, label: 'Cirilo e Metódio', grupo: 'pessoa', ano: 885, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '203', level: 4, label: 'Sta Isabel da Hungria', grupo: 'pessoa', ano: 1231, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '803', level: 4, label: 'Sta Isabel de Portugal', grupo: 'pessoa', ano: 1336, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '206', level: 4, label: 'S. João Gualberto', grupo: 'pessoa', ano: 1073, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '208', level: 4, label: 'S. Boaventura', grupo: 'pessoa', ano: 1274, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '209', level: 4, label: 'Sto. Henrique', grupo: 'pessoa', ano: 1024, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '224', level: 4, label: 'S. Bonifácio', grupo: 'pessoa', ano: 754, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '225', level: 4, label: 'S. Norberto', grupo: 'pessoa', ano: 1134, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '227', level: 4, label: 'Sta. Margarida', grupo: 'pessoa', ano: 1093, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '232', level: 4, label: 'Sta. Juliana', grupo: 'pessoa', ano: 1258, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '234', level: 4, label: 'S. Silvério', grupo: 'pessoa', ano: 537, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '238', level: 4, label: 'S. Guilherme', grupo: 'pessoa', ano: 1142, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '403', level: 4, label: 'S. Mauro', grupo: 'pessoa', ano: 584, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '407', level: 4, label: 'S. Canuto', grupo: 'pessoa', ano: 1086, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '410', level: 4, label: 'S. Raimundo de Penaforte', grupo: 'pessoa', ano: 1275, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '415', level: 4, label: 'S. Pedro Nolasco', grupo: 'pessoa', ano: 1256, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '417', level: 4, label: 'Sto. André Corsini', grupo: 'pessoa', ano: 1374, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '420', level: 4, label: 'S. Romualdo', grupo: 'pessoa', ano: 1027, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '421', level: 4, label: 'S. João da Mata', grupo: 'pessoa', ano: 1213, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '425', level: 4, label: '7 Fundadores Servitas', grupo: 'pessoa', ano: 1310, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '428', level: 4, label: 'S. Pedro Damião', grupo: 'pessoa', ano: 1072, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '430', level: 4, label: 'S. Casimiro', grupo: 'pessoa', ano: 1484, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '434', level: 4, label: 'Sta. Francisca Romana', grupo: 'pessoa', ano: 1440, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '436', level: 4, label: 'S. Gregório Magno', grupo: 'pessoa', ano: 604, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '437', level: 4, label: 'S. Patrício', grupo: 'pessoa', ano: 461, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '442', level: 4, label: 'S. João Damasceno', grupo: 'pessoa', ano: 749, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '443', level: 4, label: 'Sto. Isidoro', grupo: 'pessoa', ano: 636, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '444', level: 4, label: 'S. Vicente Férrer', grupo: 'pessoa', ano: 1419, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '446', level: 4, label: 'S. Hermenegildo', grupo: 'pessoa', ano: 585, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '450', level: 4, label: 'Sto. Anselmo', grupo: 'pessoa', ano: 1109, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '458', level: 4, label: 'S. Pedro de Verona', grupo: 'pessoa', ano: 1252, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '459', level: 4, label: 'Sta. Catarina de Sena', grupo: 'pessoa', ano: 1380, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '602', level: 4, label: 'Sto. Estanislau', grupo: 'pessoa', ano: 1079, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '605', level: 4, label: 'Sto. Antonino', grupo: 'pessoa', ano: 1459, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '611', level: 4, label: 'S. Ubaldo', grupo: 'pessoa', ano: 1160, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '614', level: 4, label: 'S. Pedro Celestino', grupo: 'pessoa', ano: 1296, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '616', level: 4, label: 'S. Bernardino de Sena', grupo: 'pessoa', ano: 1444, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '617', level: 4, label: 'S. Gregório VII', grupo: 'pessoa', ano: 1085, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '621', level: 4, label: 'S. Beda, o Venerável', grupo: 'pessoa', ano: 735, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '622', level: 4, label: 'S. João I', grupo: 'pessoa', ano: 526, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '623', level: 4, label: 'Sto. Agostinho de Cantuária', grupo: 'pessoa', ano: 604, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '626', level: 4, label: 'Sta. Joana d\'Arc', grupo: 'pessoa', ano: 1431, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '627', level: 4, label: 'S. Fernando III', grupo: 'pessoa', ano: 1252, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '640', level: 4, label: 'S. Jacinto', grupo: 'pessoa', ano: 1257, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '645', level: 4, label: 'S. Filipe Benício', grupo: 'pessoa', ano: 1285, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '646', level: 4, label: 'S. Luís IX', grupo: 'pessoa', ano: 1270, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '650', level: 4, label: 'S. Raimundo Nonato', grupo: 'pessoa', ano: 1240, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '651', level: 4, label: 'Sto. Egídio', grupo: 'pessoa', ano: 710, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '653', level: 4, label: 'Sto. Estêvão (Rei)', grupo: 'pessoa', ano: 1038, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '654', level: 4, label: 'S. Lourenço Justiniano', grupo: 'pessoa', ano: 1456, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '656', level: 4, label: 'S. Nicolau de Tolentino', grupo: 'pessoa', ano: 1305, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '667', level: 4, label: 'S. Venceslau', grupo: 'pessoa', ano: 935, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '669', level: 4, label: 'S. Remígio', grupo: 'pessoa', ano: 533, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '670', level: 4, label: 'Plácido e Companheiros', grupo: 'pessoa', ano: 541, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '671', level: 4, label: 'S. Bruno', grupo: 'pessoa', ano: 1101, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '672', level: 4, label: 'Sta. Brígida', grupo: 'pessoa', ano: 1373, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '676', level: 4, label: 'S. Eduardo', grupo: 'pessoa', ano: 1066, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '678', level: 4, label: 'Sta. Edwiges', grupo: 'pessoa', ano: 1243, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '682', level: 4, label: 'S. João Câncio', grupo: 'pessoa', ano: 1473, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '689', level: 4, label: 'S. Leonardo de Limousin', grupo: 'pessoa', ano: 559, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '694', level: 4, label: 'S. Martinho I', grupo: 'pessoa', ano: 655, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '695', level: 4, label: 'S. Diogo', grupo: 'pessoa', ano: 1463, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '697', level: 4, label: 'Sto. Alberto Magno', grupo: 'pessoa', ano: 1280, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '698', level: 4, label: 'Sta. Gertrudes', grupo: 'pessoa', ano: 1302, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '700', level: 4, label: 'S. Félix de Valois', grupo: 'pessoa', ano: 1212, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '706', level: 4, label: 'S. Silvestre (Abade)', grupo: 'pessoa', ano: 1267, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '711', level: 4, label: 'S. Sabas', grupo: 'pessoa', ano: 532, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '719', level: 4, label: 'S. Tomás Becket', grupo: 'pessoa', ano: 1170, font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 5: ERA MODERNA (Séc XVI a XVIII) (nós — linhas calculadas automaticamente) ==========
    { id: '14', level: 5, label: 'Sto. Inácio de Loyola', grupo: 'pessoa', ano: 1556, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '15', level: 5, label: 'S. Francisco Xavier', grupo: 'pessoa', ano: 1552, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '12', level: 5, label: 'Sta. Teresa d\'Ávila', grupo: 'pessoa', ano: 1582, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '13', level: 5, label: 'S. João da Cruz', grupo: 'pessoa', ano: 1591, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '75', level: 5, label: 'S. Francisco de Sales', grupo: 'pessoa', ano: 1622, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '201', level: 5, label: 'Sto. Antônio Zaccaria', grupo: 'pessoa', ano: 1539, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '211', level: 5, label: 'S. Camilo de Léllis', grupo: 'pessoa', ano: 1614, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '212', level: 5, label: 'S. Vicente de Paulo', grupo: 'pessoa', ano: 1660, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '213', level: 5, label: 'S. Jerônimo Emiliani', grupo: 'pessoa', ano: 1537, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '235', level: 5, label: 'S. Luís Gonzaga', grupo: 'pessoa', ano: 1591, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '433', level: 5, label: 'S. João de Deus', grupo: 'pessoa', ano: 1550, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '452', level: 5, label: 'S. Fidélis de Sigmaringa', grupo: 'pessoa', ano: 1622, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '455', level: 5, label: 'S. Pedro Canísio', grupo: 'pessoa', ano: 1597, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '456', level: 5, label: 'S. Paulo da Cruz', grupo: 'pessoa', ano: 1775, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '601', level: 5, label: 'S. Pio V', grupo: 'pessoa', ano: 1572, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '608', level: 5, label: 'S. Roberto Belarmino', grupo: 'pessoa', ano: 1621, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '610', level: 5, label: 'S. João Batista de La Salle', grupo: 'pessoa', ano: 1719, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '612', level: 5, label: 'S. Pascoal Bailão', grupo: 'pessoa', ano: 1592, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '619', level: 5, label: 'S. Felipe Néri', grupo: 'pessoa', ano: 1595, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '624', level: 5, label: 'Sta. Maria Madalena de Pazzi', grupo: 'pessoa', ano: 1607, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '629', level: 5, label: 'Sto. Afonso M. de Ligório', grupo: 'pessoa', ano: 1787, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '633', level: 5, label: 'S. Caetano', grupo: 'pessoa', ano: 1547, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '642', level: 5, label: 'S. João Eudes', grupo: 'pessoa', ano: 1680, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '643', level: 5, label: 'Sta. Joana Francisca de Chantal', grupo: 'pessoa', ano: 1641, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '648', level: 5, label: 'S. José de Calasanz', grupo: 'pessoa', ano: 1648, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '649', level: 5, label: 'Sta. Rosa de Lima', grupo: 'pessoa', ano: 1617, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '659', level: 5, label: 'S. José de Cupertino', grupo: 'pessoa', ano: 1663, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '662', level: 5, label: 'S. Tomás de Vilanova', grupo: 'pessoa', ano: 1555, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '673', level: 5, label: 'S. João Leonardo', grupo: 'pessoa', ano: 1609, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '675', level: 5, label: 'S. Francisco de Borja', grupo: 'pessoa', ano: 1572, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '679', level: 5, label: 'Sta. Margarida Maria Alacoque', grupo: 'pessoa', ano: 1690, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '681', level: 5, label: 'S. Pedro de Alcântara', grupo: 'pessoa', ano: 1562, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '688', level: 5, label: 'S. Carlos Borromeu', grupo: 'pessoa', ano: 1584, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '692', level: 5, label: 'Sto. André Avelino', grupo: 'pessoa', ano: 1608, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '696', level: 5, label: 'S. Josafá', grupo: 'pessoa', ano: 1623, font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 6: CONTEMPORÂNEA (Fátima inclusa, 5 nós) ==========
    { id: '16', level: 6, label: 'S. João M. Vianney', grupo: 'pessoa', ano: 1859, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '61', level: 6, label: 'S. João Bosco', grupo: 'pessoa', ano: 1888, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '17', level: 6, label: 'Sta. Teresinha', grupo: 'pessoa', ano: 1897, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '19', level: 6, label: 'S. Pio X', grupo: 'pessoa', ano: 1914, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '429', level: 6, label: 'S. Gabriel da V. Dolorosa', grupo: 'pessoa', ano: 1862, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '609', level: 6, label: 'N. Sra. do Rosário de Fátima', grupo: 'pessoa', font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 7: CONGREGAÇÕES ==========
    { id: '22', level: 7, categoria: 'fundadora', label: 'Ordem Beneditina', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '23', level: 7, categoria: 'fundadora', label: 'Ordem Franciscana', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '24', level: 7, categoria: 'fundadora', label: 'Ordem Dominicana', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '25', level: 7, categoria: 'fundadora', label: 'Companhia de Jesus', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '62', level: 7, categoria: 'fundadora', label: 'Família Salesiana', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '63', level: 7, categoria: 'reformada', label: 'Ordem Cisterciense', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '41', level: 7, categoria: 'reformada', label: 'Carmelo Descalço', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 7: OBRAS ==========

    { id: '32', level: 7, categoria: 'fundadora', label: 'Suma Teológica', grupo: 'documento', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '34', level: 7, categoria: 'fundadora', label: 'Exercícios Espirituais', grupo: 'documento', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '38', level: 7, categoria: 'fundadora', label: 'Mística Cristã', grupo: 'ideia', font: { color: '#ffffff', size: 14, bold: true } },

// ========== NÍVEL 7: OBRAS ainda nao relacionadas ==========
    
    // Regras Monásticas
    { id: '900', level: 7, categoria: 'fundadora', label: 'Regra de São Bento', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '901', level: 7, categoria: 'fundadora', label: 'Regra de Santo Agostinho', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '902', level: 7, categoria: 'fundadora', label: 'Regra de São Basílio', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    
    // Mística e Espiritualidade
    { id: '903', level: 7, categoria: 'fundadora', label: 'Castelo Interior', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '904', level: 7, categoria: 'fundadora', label: 'Noite Escura da Alma', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '905', level: 7, categoria: 'fundadora', label: 'História de uma Alma', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '906', level: 7, categoria: 'fundadora', label: 'Introdução à Vida Devota', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '907', level: 7, categoria: 'fundadora', label: 'O Diálogo', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '908', level: 7, categoria: 'fundadora', label: 'As Glórias de Maria', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '909', level: 7, categoria: 'fundadora', label: 'Cântico das Criaturas', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    
    // Teologia, Filosofia e Apologética
    { id: '910', level: 7, categoria: 'fundadora', label: 'Confissões', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '911', level: 7, categoria: 'fundadora', label: 'A Cidade de Deus', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '912', level: 7, categoria: 'fundadora', label: 'A Vulgata', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '913', level: 7, categoria: 'fundadora', label: 'Contra as Heresias', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '914', level: 7, categoria: 'fundadora', label: 'Itinerário da Mente para Deus', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '915', level: 7, categoria: 'fundadora', label: 'Proslogion', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    
    // História e Pastoral
    { id: '916', level: 7, categoria: 'fundadora', label: 'Regra Pastoral', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
    { id: '917', level: 7, categoria: 'fundadora', label: 'História Eclesiástica', grupo: 'documento', font: { color: '#ffffff', size: 13, italic: true } },
	
	
// ==========  CONGREGAÇÕES ainda nao relacionados ==========
    { id: '850', level: 7, categoria: 'fundadora', label: 'Ordem Agostiniana', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '851', level: 7, categoria: 'fundadora', label: 'Ordem do Carmo', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '852', level: 7, categoria: 'fundadora', label: 'Ordem Servita', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '853', level: 7, categoria: 'fundadora', label: 'Ordem Trinitária', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '854', level: 7, categoria: 'fundadora', label: 'Ordem Mercedária', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '855', level: 7, categoria: 'fundadora', label: 'Família Vicentina', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '856', level: 7, categoria: 'fundadora', label: 'Redentoristas', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '857', level: 7, categoria: 'fundadora', label: 'Passionistas', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '858', level: 7, categoria: 'fundadora', label: 'Oratorianos', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '859', level: 7, categoria: 'fundadora', label: 'Lassalistas', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '860', level: 7, categoria: 'fundadora', label: 'Teatinos', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '861', level: 7, categoria: 'fundadora', label: 'Camilianos', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '862', level: 7, categoria: 'fundadora', label: 'Hospitaleiros', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '863', level: 7, categoria: 'fundadora', label: 'Barnabitas', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '864', level: 7, categoria: 'fundadora', label: 'Escolápios', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '865', level: 7, categoria: 'fundadora', label: 'Visitandinas', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '866', level: 7, categoria: 'fundadora', label: 'Ordem Cartuxa', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '867', level: 7, categoria: 'fundadora', label: 'Premonstratenses', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
	
	
	
// ========== NÍVEL 8: GEOGRAFIA (Atuação/Nascimento) — linhas calculadas automaticamente ==========
    { id: '130', level: 8, categoria: 'atuacao', label: 'Nazaré', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '131', level: 8, categoria: 'atuacao', label: 'Rio Jordão', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '132', level: 8, categoria: 'atuacao', label: 'Éfeso', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '134', level: 8, categoria: 'atuacao', label: 'Lida', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '135', level: 8, categoria: 'atuacao', label: 'Tebaida', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '137', level: 8, categoria: 'atuacao', label: 'Hipona', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '138', level: 8, categoria: 'atuacao', label: 'Antioquia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '141', level: 8, categoria: 'atuacao', label: 'Monte Cassino', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '142', level: 8, categoria: 'atuacao', label: 'Claraval', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '143', level: 8, categoria: 'atuacao', label: 'Assis', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '147', level: 8, categoria: 'atuacao', label: 'Cássia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '148', level: 8, categoria: 'atuacao', label: 'Goa', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '149', level: 8, categoria: 'atuacao', label: 'Ávila', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '151', level: 8, categoria: 'atuacao', label: 'Genebra', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '152', level: 8, categoria: 'atuacao', label: 'Ars', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '153', level: 8, categoria: 'atuacao', label: 'Turim', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '154', level: 8, categoria: 'atuacao', label: 'Lisieux', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '159', level: 8, categoria: 'atuacao', label: 'Querala', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '160', level: 8, categoria: 'atuacao', label: 'Etiópia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '300', level: 8, categoria: 'atuacao', label: 'Milão', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '301', level: 8, categoria: 'atuacao', label: 'Morávia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '302', level: 8, categoria: 'atuacao', label: 'Hungria', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '804', level: 8, categoria: 'atuacao', label: 'Portugal', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '303', level: 8, categoria: 'atuacao', label: 'Vallombrosa', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '304', level: 8, categoria: 'atuacao', label: 'Lyon', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '305', level: 8, categoria: 'atuacao', label: 'Bamberg', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '306', level: 8, categoria: 'atuacao', label: 'Somasca', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '309', level: 8, categoria: 'atuacao', label: 'Betânia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '311', level: 8, categoria: 'atuacao', label: 'Maguncia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '312', level: 8, categoria: 'atuacao', label: 'Magdeburgo', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '313', level: 8, categoria: 'atuacao', label: 'Edimburgo', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '315', level: 8, categoria: 'atuacao', label: 'Cesareia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '316', level: 8, categoria: 'atuacao', label: 'Edessa', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '317', level: 8, categoria: 'atuacao', label: 'Florença', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '318', level: 8, categoria: 'atuacao', label: 'Nola', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '319', level: 8, categoria: 'atuacao', label: 'Monte Vergine', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '500', level: 8, categoria: 'atuacao', label: 'Poitiers', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '501', level: 8, categoria: 'atuacao', label: 'Glanfeuil', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '502', level: 8, categoria: 'atuacao', label: 'Odense', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '503', level: 8, categoria: 'atuacao', label: 'Saragoça', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '504', level: 8, categoria: 'atuacao', label: 'Barcelona', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '505', level: 8, categoria: 'atuacao', label: 'Esmirna', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '506', level: 8, categoria: 'atuacao', label: 'Constantinopla', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '507', level: 8, categoria: 'atuacao', label: 'Fiesole', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '508', level: 8, categoria: 'atuacao', label: 'Creta', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '509', level: 8, categoria: 'atuacao', label: 'Camaldoli', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '510', level: 8, categoria: 'atuacao', label: 'Alexandria', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '511', level: 8, categoria: 'atuacao', label: 'Lourdes', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '512', level: 8, categoria: 'atuacao', label: 'Bréscia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '513', level: 8, categoria: 'atuacao', label: 'Fonte Avellana', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '514', level: 8, categoria: 'atuacao', label: 'Isola Gran Sasso', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '515', level: 8, categoria: 'atuacao', label: 'Cracóvia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '517', level: 8, categoria: 'atuacao', label: 'Granada', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '518', level: 8, categoria: 'atuacao', label: 'Irlanda', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '519', level: 8, categoria: 'atuacao', label: 'Damasco', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '520', level: 8, categoria: 'atuacao', label: 'Sevilha', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '521', level: 8, categoria: 'atuacao', label: 'Valência', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '522', level: 8, categoria: 'atuacao', label: 'Tarragona', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '523', level: 8, categoria: 'atuacao', label: 'Cantuária', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '524', level: 8, categoria: 'atuacao', label: 'Seewis', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '525', level: 8, categoria: 'atuacao', label: 'Veneza', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '526', level: 8, categoria: 'atuacao', label: 'Friburgo', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '527', level: 8, categoria: 'atuacao', label: 'Siena', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '801', level: 8, categoria: 'atuacao', label: 'Fátima', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 8: GEOGRAFIA (Martírio/Morte) — linhas calculadas automaticamente ==========
    { id: '26',  level: 8, categoria: 'morte', label: 'Roma', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '133', level: 8, categoria: 'morte', label: 'Jerusalém', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '136', level: 8, categoria: 'morte', label: 'Óstia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '139', level: 8, categoria: 'morte', label: 'Sebaste', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '140', level: 8, categoria: 'morte', label: 'Catânia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '144', level: 8, categoria: 'morte', label: 'Bolonha', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '145', level: 8, categoria: 'morte', label: 'Nápoles', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '146', level: 8, categoria: 'morte', label: 'Pádua', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '150', level: 8, categoria: 'morte', label: 'Úbeda', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '155', level: 8, categoria: 'morte', label: 'Patras', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '156', level: 8, categoria: 'morte', label: 'Santiago (Compostela)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '157', level: 8, categoria: 'morte', label: 'Hierápolis', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '158', level: 8, categoria: 'morte', label: 'Armênia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '161', level: 8, categoria: 'morte', label: 'Pérsia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '307', level: 8, categoria: 'morte', label: 'Bolsena', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '308', level: 8, categoria: 'morte', label: 'Nicomédia', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '310', level: 8, categoria: 'morte', label: 'Ravena', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '314', level: 8, categoria: 'morte', label: 'Chipre', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '320', level: 8, categoria: 'morte', label: 'Paris', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '516', level: 8, categoria: 'morte', label: 'Cartago', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '800', level: 8, categoria: 'morte', label: 'Tours', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true }, },
	
	
	
	
	
	// =========================================================================
    // NÍVEL 9: FENÔMENOS, RELÍQUIAS, SANTUÁRIOS E ICONOGRAFIA
    // =========================================================================
    
	

    // Santuários / Túmulos de Grande Peregrinação
    { id: '1004', level: 9, categoria: 'santuario', label: 'Basílica de S. Pedro', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1005', level: 9, categoria: 'santuario', label: 'Catedral de Santiago', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1006', level: 9, categoria: 'santuario', label: 'Basílica de S. Francisco', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1007', level: 9, categoria: 'santuario', label: 'Basílica de Sto. Antônio', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    
    // Iconografia / Símbolos Identificadores
    { id: '1008', level: 9, categoria: 'simbolo', label: 'As Chaves do Reino', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1009', level: 9, categoria: 'simbolo', label: 'Chuva de Rosas', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
	
	
    // --- FENÔMENOS MÍSTICOS ---
    { id: '1000', level: 9, categoria: 'mistica', label: 'Corpo Incorrupto', grupo: 'fenomeno', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1001', level: 9, categoria: 'mistica', label: 'Estigmas (Chagas)', grupo: 'fenomeno', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1002', level: 9, categoria: 'mistica', label: 'Bilocação', grupo: 'fenomeno', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1003', level: 9, categoria: 'mistica', label: 'Levitação', grupo: 'fenomeno', font: { color: '#ffffff', size: 14, bold: true } },

    // --- RELÍQUIAS FAMOSAS ---
    { id: '1010', level: 9, categoria: 'reliquia', label: 'Sangue Liquefeito', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1011', level: 9, categoria: 'reliquia', label: 'Coração Incorrupto', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1012', level: 9, categoria: 'reliquia', label: 'Língua Intacta', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1013', level: 9, categoria: 'reliquia', label: 'Cabeça / Crânio', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1014', level: 9, categoria: 'reliquia', label: 'Manto Partilhado', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1015', level: 9, categoria: 'reliquia', label: 'Correntes da Prisão', grupo: 'reliquia', font: { color: '#ffffff', size: 14, bold: true } },

    // --- GRANDES SANTUÁRIOS / TÚMULOS ---
    { id: '1020', level: 9, categoria: 'santuario', label: 'Basílica de S. Pedro (Roma)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1021', level: 9, categoria: 'santuario', label: 'Catedral de Santiago (Espanha)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1022', level: 9, categoria: 'santuario', label: 'Basílica de Assis (Itália)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1023', level: 9, categoria: 'santuario', label: 'Basílica de Pádua (Itália)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1024', level: 9, categoria: 'santuario', label: 'Basílica de S. Paulo (Roma)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1025', level: 9, categoria: 'santuario', label: 'Santuário de Ars (França)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1026', level: 9, categoria: 'santuario', label: 'Basílica de Lisieux (França)', grupo: 'santuario', font: { color: '#ffffff', size: 14, bold: true } },

    // --- ICONOGRAFIA (Símbolos na Arte) ---
    { id: '1030', level: 9, categoria: 'simbolo', label: 'As Chaves', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1031', level: 9, categoria: 'simbolo', label: 'A Espada', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1032', level: 9, categoria: 'simbolo', label: 'O Lírio (Pureza)', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1033', level: 9, categoria: 'simbolo', label: 'As Rosas', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1034', level: 9, categoria: 'simbolo', label: 'A Caveira (Memento Mori)', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1035', level: 9, categoria: 'simbolo', label: 'Livro (Doutor/Evangelho)', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1036', level: 9, categoria: 'simbolo', label: 'O Dragão', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1037', level: 9, categoria: 'simbolo', label: 'Flechas do Martírio', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1038', level: 9, categoria: 'simbolo', label: 'A Grelha', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1039', level: 9, categoria: 'simbolo', label: 'O Cordeiro', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1040', level: 9, categoria: 'simbolo', label: 'Olhos numa bandeja', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1041', level: 9, categoria: 'simbolo', label: 'Seios numa bandeja', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1042', level: 9, categoria: 'simbolo', label: 'Alicate e Dentes', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1043', level: 9, categoria: 'simbolo', label: 'A Roda Quebrada', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1044', level: 9, categoria: 'simbolo', label: 'O Leão', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1045', level: 9, categoria: 'simbolo', label: 'A Águia', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1046', level: 9, categoria: 'simbolo', label: 'O Touro', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
	
	// ========== ADIÇÃO: S. LIBÓRIO E SUA CIDADE ==========
    { id: '721', level: 3, label: 'S. Libório', grupo: 'pessoa', ano: 397, font: { color: '#ffffff', size: 14, bold: true } },
    { id: '802', level: 8, categoria: 'atuacao', label: 'Le Mans', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
	
	// ========== NÍVEL 8: GEOGRAFIA (Relíquias de S. Libório) ==========
    { id: '803', level: 8, categoria: 'santuario', label: 'Paderborn (Alemanha)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },

    // ========== NÍVEL 9: ICONOGRAFIA DE S. LIBÓRIO ==========
    { id: '1047', level: 9, categoria: 'simbolo', label: 'O Pavão', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } },
    { id: '1048', level: 9, categoria: 'simbolo', label: 'Pedras sobre um livro', grupo: 'iconografia', font: { color: '#ffffff', size: 14, bold: true } }
	
	
	
	
	
	
	
	
	
	
	
];












var todosSetas = [
    // ATRIBUTOS -> SANTOS (Nível 1 descendo)
    // Papas (56)
    { from: '56', to: '2', title: 'é', texto: 'é' },
    { from: '56', to: '19', title: 'é', texto: 'é' },
    { from: '56', to: '200', title: 'é', texto: 'é' },
    { from: '56', to: '205', title: 'é', texto: 'é' },
    { from: '56', to: '207', title: 'é', texto: 'é' },
    { from: '56', to: '234', title: 'é', texto: 'é' },
    { from: '56', to: '400', title: 'é', texto: 'é' },
    { from: '56', to: '404', title: 'é', texto: 'é' },
    { from: '56', to: '408', title: 'é', texto: 'é' },
    { from: '56', to: '431', title: 'é', texto: 'é' },
    { from: '56', to: '436', title: 'é', texto: 'é' },
    { from: '56', to: '445', title: 'é', texto: 'é' },
    { from: '56', to: '449', title: 'é', texto: 'é' },
    { from: '56', to: '451', title: 'é', texto: 'é' },
    { from: '56', to: '454', title: 'é', texto: 'é' },
    { from: '56', to: '601', title: 'é', texto: 'é' },
    { from: '56', to: '614', title: 'é', texto: 'é' },
    { from: '56', to: '617', title: 'é', texto: 'é' },
    { from: '56', to: '618', title: 'é', texto: 'é' },
    { from: '56', to: '620', title: 'é', texto: 'é' },
    { from: '56', to: '622', title: 'é', texto: 'é' },
    { from: '56', to: '625', title: 'é', texto: 'é' },
    { from: '56', to: '647', title: 'é', texto: 'é' },
    { from: '56', to: '658', title: 'é', texto: 'é' },
    { from: '56', to: '664', title: 'é', texto: 'é' },
    { from: '56', to: '677', title: 'é', texto: 'é' },
    { from: '56', to: '687', title: 'é', texto: 'é' },
    { from: '56', to: '694', title: 'é', texto: 'é' },
    { from: '56', to: '702', title: 'é', texto: 'é' },
    { from: '56', to: '714', title: 'é', texto: 'é' },
    { from: '56', to: '715', title: 'é', texto: 'é' },
    { from: '56', to: '720', title: 'é', texto: 'é' },

    // Bispos (57)
    { from: '57', to: '5', title: 'é', texto: 'é' },
    { from: '57', to: '75', title: 'é', texto: 'é' },
    { from: '57', to: '81', title: 'é', texto: 'é' },
    { from: '57', to: '82', title: 'é', texto: 'é' },
    { from: '57', to: '208', title: 'é', texto: 'é' },
    { from: '57', to: '216', title: 'é', texto: 'é' },
    { from: '57', to: '224', title: 'é', texto: 'é' },
    { from: '57', to: '225', title: 'é', texto: 'é' },
    { from: '57', to: '229', title: 'é', texto: 'é' },
    { from: '57', to: '236', title: 'é', texto: 'é' },
    { from: '57', to: '239', title: 'é', texto: 'é' },
    { from: '57', to: '401', title: 'é', texto: 'é' },
    { from: '57', to: '412', title: 'é', texto: 'é' },
    { from: '57', to: '413', title: 'é', texto: 'é' },
    { from: '57', to: '414', title: 'é', texto: 'é' },
    { from: '57', to: '417', title: 'é', texto: 'é' },
    { from: '57', to: '418', title: 'é', texto: 'é' },
    { from: '57', to: '422', title: 'é', texto: 'é' },
    { from: '57', to: '427', title: 'é', texto: 'é' },
    { from: '57', to: '428', title: 'é', texto: 'é' },
    { from: '57', to: '437', title: 'é', texto: 'é' },
    { from: '57', to: '438', title: 'é', texto: 'é' },
    { from: '57', to: '443', title: 'é', texto: 'é' },
    { from: '57', to: '450', title: 'é', texto: 'é' },
    { from: '57', to: '55', title: 'é', texto: 'é' },
    { from: '57', to: '600', title: 'é', texto: 'é' },
    { from: '57', to: '602', title: 'é', texto: 'é' },
    { from: '57', to: '604', title: 'é', texto: 'é' },
    { from: '57', to: '605', title: 'é', texto: 'é' },
    { from: '57', to: '608', title: 'é', texto: 'é' },
    { from: '57', to: '611', title: 'é', texto: 'é' },
    { from: '57', to: '623', title: 'é', texto: 'é' },
    { from: '57', to: '629', title: 'é', texto: 'é' },
    { from: '57', to: '654', title: 'é', texto: 'é' },
    { from: '57', to: '660', title: 'é', texto: 'é' },
    { from: '57', to: '662', title: 'é', texto: 'é' },
    { from: '57', to: '669', title: 'é', texto: 'é' },
    { from: '57', to: '688', title: 'é', texto: 'é' },
    { from: '57', to: '693', title: 'é', texto: 'é' },
    { from: '57', to: '696', title: 'é', texto: 'é' },
    { from: '57', to: '697', title: 'é', texto: 'é' },
    { from: '57', to: '699', title: 'é', texto: 'é' },
    { from: '57', to: '707', title: 'é', texto: 'é' },
    { from: '57', to: '710', title: 'é', texto: 'é' },
    { from: '57', to: '712', title: 'é', texto: 'é' },
    { from: '57', to: '713', title: 'é', texto: 'é' },
    { from: '57', to: '717', title: 'é', texto: 'é' },
    { from: '57', to: '719', title: 'é', texto: 'é' },

    // Abades (59)
    { from: '59', to: '74', title: 'é', texto: 'é' },
    { from: '59', to: '6', title: 'é', texto: 'é' },
    { from: '59', to: '66', title: 'é', texto: 'é' },
    { from: '59', to: '206', title: 'é', texto: 'é' },
    { from: '59', to: '238', title: 'é', texto: 'é' },
    { from: '59', to: '403', title: 'é', texto: 'é' },
    { from: '59', to: '420', title: 'é', texto: 'é' },
    { from: '59', to: '651', title: 'é', texto: 'é' },
    { from: '59', to: '683', title: 'é', texto: 'é' },
    { from: '59', to: '706', title: 'é', texto: 'é' },
    { from: '59', to: '711', title: 'é', texto: 'é' },

    // Viúvas (60)
    { from: '60', to: '64', title: 'é', texto: 'é' },
    { from: '60', to: '67', title: 'é', texto: 'é' },
    { from: '60', to: '203', title: 'é', texto: 'é' },
    { from: '60', to: '803', title: 'é', texto: 'é' },
    { from: '60', to: '227', title: 'é', texto: 'é' },
    { from: '60', to: '218', title: 'é', texto: 'é' },
    { from: '60', to: '434', title: 'é', texto: 'é' },
    { from: '60', to: '643', title: 'é', texto: 'é' },
    { from: '60', to: '672', title: 'é', texto: 'é' },
    { from: '60', to: '678', title: 'é', texto: 'é' },

    // Virgens (52)
    { from: '52', to: '73', title: 'é', texto: 'é' },
    { from: '52', to: '11', title: 'é', texto: 'é' },
    { from: '52', to: '12', title: 'é', texto: 'é' },
    { from: '52', to: '17', title: 'é', texto: 'é' },
    { from: '52', to: '83', title: 'é', texto: 'é' },
    { from: '52', to: '85', title: 'é', texto: 'é' },
    { from: '52', to: '214', title: 'é', texto: 'é' },
    { from: '52', to: '217', title: 'é', texto: 'é' },
    { from: '52', to: '232', title: 'é', texto: 'é' },
    { from: '52', to: '221', title: 'é', texto: 'é' },
    { from: '52', to: '405', title: 'é', texto: 'é' },
    { from: '52', to: '411', title: 'é', texto: 'é' },
    { from: '52', to: '416', title: 'é', texto: 'é' },
    { from: '52', to: '419', title: 'é', texto: 'é' },
    { from: '52', to: '423', title: 'é', texto: 'é' },
    { from: '52', to: '424', title: 'é', texto: 'é' },
    { from: '52', to: '440', title: 'é', texto: 'é' },
    { from: '52', to: '441', title: 'é', texto: 'é' },
    { from: '52', to: '459', title: 'é', texto: 'é' },
    { from: '52', to: '615', title: 'é', texto: 'é' },
    { from: '52', to: '624', title: 'é', texto: 'é' },
    { from: '52', to: '626', title: 'é', texto: 'é' },
    { from: '52', to: '628', title: 'é', texto: 'é' },
    { from: '52', to: '649', title: 'é', texto: 'é' },
    { from: '52', to: '679', title: 'é', texto: 'é' },
    { from: '52', to: '684', title: 'é', texto: 'é' },
    { from: '52', to: '698', title: 'é', texto: 'é' },
    { from: '52', to: '701', title: 'é', texto: 'é' },
    { from: '52', to: '705', title: 'é', texto: 'é' },
    { from: '52', to: '709', title: 'é', texto: 'é' },
    { from: '52', to: '716', title: 'é', texto: 'é' },

    // Penitentes (54)
    { from: '54', to: '215', title: 'é', texto: 'é' },

    // Doutores (51)
    { from: '51', to: '5', title: 'é', texto: 'é' },
    { from: '51', to: '10', title: 'é', texto: 'é' },
    { from: '51', to: '13', title: 'é', texto: 'é' },
    { from: '51', to: '65', title: 'é', texto: 'é' },
    { from: '51', to: '66', title: 'é', texto: 'é' },
    { from: '51', to: '75', title: 'é', texto: 'é' },
    { from: '51', to: '208', title: 'é', texto: 'é' },
    { from: '51', to: '229', title: 'é', texto: 'é' },
    { from: '51', to: '231', title: 'é', texto: 'é' },
    { from: '51', to: '401', title: 'é', texto: 'é' },
    { from: '51', to: '414', title: 'é', texto: 'é' },
    { from: '51', to: '422', title: 'é', texto: 'é' },
    { from: '51', to: '428', title: 'é', texto: 'é' },
    { from: '51', to: '436', title: 'é', texto: 'é' },
    { from: '51', to: '438', title: 'é', texto: 'é' },
    { from: '51', to: '442', title: 'é', texto: 'é' },
    { from: '51', to: '443', title: 'é', texto: 'é' },
    { from: '51', to: '445', title: 'é', texto: 'é' },
    { from: '51', to: '450', title: 'é', texto: 'é' },
    { from: '51', to: '455', title: 'é', texto: 'é' },
    { from: '51', to: '600', title: 'é', texto: 'é' },
    { from: '51', to: '604', title: 'é', texto: 'é' },
    { from: '51', to: '608', title: 'é', texto: 'é' },
    { from: '51', to: '621', title: 'é', texto: 'é' },
    { from: '51', to: '629', title: 'é', texto: 'é' },
    { from: '51', to: '668', title: 'é', texto: 'é' },
    { from: '51', to: '697', title: 'é', texto: 'é' },
    { from: '51', to: '710', title: 'é', texto: 'é' },
    { from: '51', to: '713', title: 'é', texto: 'é' },

    // Mártires (50)
    { from: '50', to: '71', title: 'é', texto: 'é' },
    { from: '50', to: '2', title: 'é', texto: 'é' },
    { from: '50', to: '3', title: 'é', texto: 'é' },
    { from: '50', to: '73', title: 'é', texto: 'é' },
    { from: '50', to: '72', title: 'é', texto: 'é' },
    { from: '50', to: '7', title: 'é', texto: 'é' },
    { from: '50', to: '86', title: 'é', texto: 'é' },
    { from: '50', to: '81', title: 'é', texto: 'é' },
    { from: '50', to: '82', title: 'é', texto: 'é' },
    { from: '50', to: '83', title: 'é', texto: 'é' },
    { from: '50', to: '84', title: 'é', texto: 'é' },
    { from: '50', to: '110', title: 'é', texto: 'é' },
    { from: '50', to: '111', title: 'é', texto: 'é' },
    { from: '50', to: '112', title: 'é', texto: 'é' },
    { from: '50', to: '113', title: 'é', texto: 'é' },
    { from: '50', to: '114', title: 'é', texto: 'é' },
    { from: '50', to: '115', title: 'é', texto: 'é' },
    { from: '50', to: '116', title: 'é', texto: 'é' },
    { from: '50', to: '117', title: 'é', texto: 'é' },
    { from: '50', to: '118', title: 'é', texto: 'é' },
    { from: '50', to: '228', title: 'é', texto: 'é' },
    { from: '50', to: '204', title: 'é', texto: 'é' },
    { from: '50', to: '205', title: 'é', texto: 'é' },
    { from: '50', to: '207', title: 'é', texto: 'é' },
    { from: '50', to: '216', title: 'é', texto: 'é' },
    { from: '50', to: '217', title: 'é', texto: 'é' },
    { from: '50', to: '219', title: 'é', texto: 'é' },
    { from: '50', to: '220', title: 'é', texto: 'é' },
    { from: '50', to: '222', title: 'é', texto: 'é' },
    { from: '50', to: '223', title: 'é', texto: 'é' },
    { from: '50', to: '224', title: 'é', texto: 'é' },
    { from: '50', to: '226', title: 'é', texto: 'é' },
    { from: '50', to: '230', title: 'é', texto: 'é' },
    { from: '50', to: '233', title: 'é', texto: 'é' },
    { from: '50', to: '234', title: 'é', texto: 'é' },
    { from: '50', to: '237', title: 'é', texto: 'é' },
    { from: '50', to: '239', title: 'é', texto: 'é' },
    { from: '50', to: '400', title: 'é', texto: 'é' },
    { from: '50', to: '402', title: 'é', texto: 'é' },
    { from: '50', to: '404', title: 'é', texto: 'é' },
    { from: '50', to: '405', title: 'é', texto: 'é' },
    { from: '50', to: '406', title: 'é', texto: 'é' },
    { from: '50', to: '407', title: 'é', texto: 'é' },
    { from: '50', to: '408', title: 'é', texto: 'é' },
    { from: '50', to: '409', title: 'é', texto: 'é' },
    { from: '50', to: '411', title: 'é', texto: 'é' },
    { from: '50', to: '412', title: 'é', texto: 'é' },
    { from: '50', to: '413', title: 'é', texto: 'é' },
    { from: '50', to: '416', title: 'é', texto: 'é' },
    { from: '50', to: '419', title: 'é', texto: 'é' },
    { from: '50', to: '423', title: 'é', texto: 'é' },
    { from: '50', to: '426', title: 'é', texto: 'é' },
    { from: '50', to: '427', title: 'é', texto: 'é' },
    { from: '50', to: '431', title: 'é', texto: 'é' },
    { from: '50', to: '432', title: 'é', texto: 'é' },
    { from: '50', to: '435', title: 'é', texto: 'é' },
    { from: '50', to: '446', title: 'é', texto: 'é' },
    { from: '50', to: '447', title: 'é', texto: 'é' },
    { from: '50', to: '448', title: 'é', texto: 'é' },
    { from: '50', to: '449', title: 'é', texto: 'é' },
    { from: '50', to: '451', title: 'é', texto: 'é' },
    { from: '50', to: '452', title: 'é', texto: 'é' },
    { from: '50', to: '453', title: 'é', texto: 'é' },
    { from: '50', to: '454', title: 'é', texto: 'é' },
    { from: '50', to: '457', title: 'é', texto: 'é' },
    { from: '50', to: '458', title: 'é', texto: 'é' },
    { from: '50', to: '602', title: 'é', texto: 'é' },
    { from: '50', to: '606', title: 'é', texto: 'é' },
    { from: '50', to: '607', title: 'é', texto: 'é' },
    { from: '50', to: '613', title: 'é', texto: 'é' },
    { from: '50', to: '618', title: 'é', texto: 'é' },
    { from: '50', to: '620', title: 'é', texto: 'é' },
    { from: '50', to: '622', title: 'é', texto: 'é' },
    { from: '50', to: '625', title: 'é', texto: 'é' },
    { from: '50', to: '630', title: 'é', texto: 'é' },
    { from: '50', to: '634', title: 'é', texto: 'é' },
    { from: '50', to: '635', title: 'é', texto: 'é' },
    { from: '50', to: '636', title: 'é', texto: 'é' },
    { from: '50', to: '637', title: 'é', texto: 'é' },
    { from: '50', to: '641', title: 'é', texto: 'é' },
    { from: '50', to: '647', title: 'é', texto: 'é' },
    { from: '50', to: '652', title: 'é', texto: 'é' },
    { from: '50', to: '655', title: 'é', texto: 'é' },
    { from: '50', to: '657', title: 'é', texto: 'é' },
    { from: '50', to: '658', title: 'é', texto: 'é' },
    { from: '50', to: '660', title: 'é', texto: 'é' },
    { from: '50', to: '661', title: 'é', texto: 'é' },
    { from: '50', to: '663', title: 'é', texto: 'é' },
    { from: '50', to: '664', title: 'é', texto: 'é' },
    { from: '50', to: '665', title: 'é', texto: 'é' },
    { from: '50', to: '666', title: 'é', texto: 'é' },
    { from: '50', to: '667', title: 'é', texto: 'é' },
    { from: '50', to: '670', title: 'é', texto: 'é' },
    { from: '50', to: '674', title: 'é', texto: 'é' },
    { from: '50', to: '677', title: 'é', texto: 'é' },
    { from: '50', to: '684', title: 'é', texto: 'é' },
    { from: '50', to: '686', title: 'é', texto: 'é' },
    { from: '50', to: '687', title: 'é', texto: 'é' },
    { from: '50', to: '690', title: 'é', texto: 'é' },
    { from: '50', to: '691', title: 'é', texto: 'é' },
    { from: '50', to: '694', title: 'é', texto: 'é' },
    { from: '50', to: '696', title: 'é', texto: 'é' },
    { from: '50', to: '701', title: 'é', texto: 'é' },
    { from: '50', to: '702', title: 'é', texto: 'é' },
    { from: '50', to: '703', title: 'é', texto: 'é' },
    { from: '50', to: '704', title: 'é', texto: 'é' },
    { from: '50', to: '705', title: 'é', texto: 'é' },
    { from: '50', to: '707', title: 'é', texto: 'é' },
    { from: '50', to: '708', title: 'é', texto: 'é' },
    { from: '50', to: '709', title: 'é', texto: 'é' },
    { from: '50', to: '714', title: 'é', texto: 'é' },
    { from: '50', to: '716', title: 'é', texto: 'é' },
    { from: '50', to: '717', title: 'é', texto: 'é' },
    { from: '50', to: '718', title: 'é', texto: 'é' },
    { from: '50', to: '719', title: 'é', texto: 'é' },

    // Confessores (53)
    { from: '53', to: '4', title: 'é', texto: 'é' },
    { from: '53', to: '76', title: 'é', texto: 'é' },
    { from: '53', to: '8', title: 'é', texto: 'é' },
    { from: '53', to: '9', title: 'é', texto: 'é' },
    { from: '53', to: '14', title: 'é', texto: 'é' },
    { from: '53', to: '15', title: 'é', texto: 'é' },
    { from: '53', to: '16', title: 'é', texto: 'é' },
    { from: '53', to: '61', title: 'é', texto: 'é' },
    { from: '53', to: '201', title: 'é', texto: 'é' },
    { from: '53', to: '202', title: 'é', texto: 'é' },
    { from: '53', to: '209', title: 'é', texto: 'é' },
    { from: '53', to: '210', title: 'é', texto: 'é' },
    { from: '53', to: '211', title: 'é', texto: 'é' },
    { from: '53', to: '212', title: 'é', texto: 'é' },
    { from: '53', to: '213', title: 'é', texto: 'é' },
    { from: '53', to: '235', title: 'é', texto: 'é' },
    { from: '53', to: '55', title: 'é', texto: 'é' },
    { from: '53', to: '410', title: 'é', texto: 'é' },
    { from: '53', to: '415', title: 'é', texto: 'é' },
    { from: '53', to: '421', title: 'é', texto: 'é' },
    { from: '53', to: '425', title: 'é', texto: 'é' },
    { from: '53', to: '429', title: 'é', texto: 'é' },
    { from: '53', to: '430', title: 'é', texto: 'é' },
    { from: '53', to: '433', title: 'é', texto: 'é' },
    { from: '53', to: '439', title: 'é', texto: 'é' },
    { from: '53', to: '444', title: 'é', texto: 'é' },
    { from: '53', to: '456', title: 'é', texto: 'é' },
    { from: '53', to: '600', title: 'é', texto: 'é' },
    { from: '53', to: '601', title: 'é', texto: 'é' },
    { from: '53', to: '604', title: 'é', texto: 'é' },
    { from: '53', to: '605', title: 'é', texto: 'é' },
    { from: '53', to: '608', title: 'é', texto: 'é' },
    { from: '53', to: '610', title: 'é', texto: 'é' },
    { from: '53', to: '611', title: 'é', texto: 'é' },
    { from: '53', to: '612', title: 'é', texto: 'é' },
    { from: '53', to: '614', title: 'é', texto: 'é' },
    { from: '53', to: '616', title: 'é', texto: 'é' },
    { from: '53', to: '617', title: 'é', texto: 'é' },
    { from: '53', to: '619', title: 'é', texto: 'é' },
    { from: '53', to: '621', title: 'é', texto: 'é' },
    { from: '53', to: '623', title: 'é', texto: 'é' },
    { from: '53', to: '627', title: 'é', texto: 'é' },
    { from: '53', to: '629', title: 'é', texto: 'é' },
    { from: '53', to: '633', title: 'é', texto: 'é' },
    { from: '53', to: '639', title: 'é', texto: 'é' },
    { from: '53', to: '640', title: 'é', texto: 'é' },
    { from: '53', to: '642', title: 'é', texto: 'é' },
    { from: '53', to: '645', title: 'é', texto: 'é' },
    { from: '53', to: '646', title: 'é', texto: 'é' },
    { from: '53', to: '648', title: 'é', texto: 'é' },
    { from: '53', to: '650', title: 'é', texto: 'é' },
    { from: '53', to: '651', title: 'é', texto: 'é' },
    { from: '53', to: '653', title: 'é', texto: 'é' },
    { from: '53', to: '654', title: 'é', texto: 'é' },
    { from: '53', to: '656', title: 'é', texto: 'é' },
    { from: '53', to: '659', title: 'é', texto: 'é' },
    { from: '53', to: '662', title: 'é', texto: 'é' },
    { from: '53', to: '668', title: 'é', texto: 'é' },
    { from: '53', to: '669', title: 'é', texto: 'é' },
    { from: '53', to: '671', title: 'é', texto: 'é' },
    { from: '53', to: '673', title: 'é', texto: 'é' },
    { from: '53', to: '675', title: 'é', texto: 'é' },
    { from: '53', to: '676', title: 'é', texto: 'é' },
    { from: '53', to: '681', title: 'é', texto: 'é' },
    { from: '53', to: '682', title: 'é', texto: 'é' },
    { from: '53', to: '683', title: 'é', texto: 'é' },
    { from: '53', to: '688', title: 'é', texto: 'é' },
    { from: '53', to: '689', title: 'é', texto: 'é' },
    { from: '53', to: '692', title: 'é', texto: 'é' },
    { from: '53', to: '693', title: 'é', texto: 'é' },
    { from: '53', to: '695', title: 'é', texto: 'é' },
    { from: '53', to: '697', title: 'é', texto: 'é' },
    { from: '53', to: '699', title: 'é', texto: 'é' },
    { from: '53', to: '700', title: 'é', texto: 'é' },
    { from: '53', to: '706', title: 'é', texto: 'é' },
    { from: '53', to: '710', title: 'é', texto: 'é' },
    { from: '53', to: '711', title: 'é', texto: 'é' },
    { from: '53', to: '712', title: 'é', texto: 'é' },
    { from: '53', to: '713', title: 'é', texto: 'é' },
    { from: '53', to: '715', title: 'é', texto: 'é' },
    { from: '53', to: '720', title: 'é', texto: 'é' },

    // Festa/Arcanjo (58) — título novo, para nós que não se encaixam
    // nas categorias tradicionais (arcanjos, festas e mistérios marianos/
    // cristológicos). Exceção: 680 (S. Lucas Evangelista) é evangelista,
    // não arcanjo/festa — incluído aqui por decisão explícita, mas
    // conceitualmente destoa do grupo; revisar se fizer sentido depois.
    { from: '58', to: '603', title: 'é', texto: 'é' },
    { from: '58', to: '609', title: 'é', texto: 'é' },
    { from: '58', to: '631', title: 'é', texto: 'é' },
    { from: '58', to: '632', title: 'é', texto: 'é' },
    { from: '58', to: '638', title: 'é', texto: 'é' },
    { from: '58', to: '644', title: 'é', texto: 'é' },
    { from: '58', to: '680', title: 'é', texto: 'é' },
    { from: '58', to: '685', title: 'é', texto: 'é' },

    // ========== CALENDÁRIO -> SANTOS ==========
    // Janeiro (70)
    { from: '70', to: '400', texto: 'Dia 11' },
    { from: '70', to: '401', texto: 'Dia 14' },
    { from: '70', to: '402', texto: 'Dia 14' },
    { from: '70', to: '76',  texto: 'Dia 15' },
    { from: '70', to: '403', texto: 'Dia 15' },
    { from: '70', to: '404', texto: 'Dia 16' },
    { from: '70', to: '74',  texto: 'Dia 17' },
    { from: '70', to: '2',   texto: 'Cátedra Roma (18)' },
    { from: '70', to: '3',   texto: 'Dia 18' },
    { from: '70', to: '405', texto: 'Dia 18' },
    { from: '70', to: '406', texto: 'Dia 19' },
    { from: '70', to: '407', texto: 'Dia 19' },
    { from: '70', to: '408', texto: 'Dia 20' },
    { from: '70', to: '72',  texto: 'Dia 20' },
    { from: '70', to: '73',  texto: 'Dia 21' },
    { from: '70', to: '409', texto: 'Dia 22' },
    { from: '70', to: '410', texto: 'Dia 23' },
    { from: '70', to: '411', texto: 'Dia 23' },
    { from: '70', to: '412', texto: 'Dia 24' },
    { from: '70', to: '3',   texto: 'Conversão (25)' },
    { from: '70', to: '413', texto: 'Dia 26' },
    { from: '70', to: '414', texto: 'Dia 27' },
    { from: '70', to: '415', texto: 'Dia 28' },
    { from: '70', to: '73',  texto: 'Secundo (28)' },
    { from: '70', to: '75',  texto: 'Dia 29' },
    { from: '70', to: '416', texto: 'Dia 30' },
    { from: '70', to: '61',  texto: 'Dia 31' },

    // Fevereiro (80)
    { from: '80', to: '81',  texto: 'Dia 1' },
    { from: '80', to: '82',  texto: 'Dia 3' },
    { from: '80', to: '417', texto: 'Dia 4' },
    { from: '80', to: '83',  texto: 'Dia 5' },
    { from: '80', to: '418', texto: 'Dia 6' },
    { from: '80', to: '419', texto: 'Dia 6' },
    { from: '80', to: '420', texto: 'Dia 7' },
    { from: '80', to: '421', texto: 'Dia 8' },
    { from: '80', to: '422', texto: 'Dia 9' },
    { from: '80', to: '423', texto: 'Dia 9' },
    { from: '80', to: '85',  texto: 'Dia 10' },
    { from: '80', to: '424', texto: 'Dia 11' },
    { from: '80', to: '425', texto: 'Dia 12' },
    { from: '80', to: '84',  texto: 'Dia 14' },
    { from: '80', to: '426', texto: 'Dia 15' },
    { from: '80', to: '427', texto: 'Dia 18' },
    { from: '80', to: '2',   texto: 'Cátedra Antioquia (22)' },
    { from: '80', to: '428', texto: 'Dia 23' },
    { from: '80', to: '86',  texto: 'Dia 24 (ou 23)' },
    { from: '80', to: '429', texto: 'Dia 27' },

    // Março (90)
    { from: '90', to: '430', texto: 'Dia 4' },
    { from: '90', to: '431', texto: 'Dia 4' },
    { from: '90', to: '432', texto: 'Dia 6' },
    { from: '90', to: '10',  texto: 'Dia 7' },
    { from: '90', to: '433', texto: 'Dia 8' },
    { from: '90', to: '434', texto: 'Dia 9' },
    { from: '90', to: '435', texto: 'Dia 10' },
    { from: '90', to: '436', texto: 'Dia 12' },
    { from: '90', to: '437', texto: 'Dia 17' },
    { from: '90', to: '438', texto: 'Dia 18' },
    { from: '90', to: '4',   texto: 'Dia 19' },
    { from: '90', to: '6',   texto: 'Dia 21' },
    { from: '90', to: '439', texto: 'Dia 24' },
    { from: '90', to: '440', texto: 'Dia 25' },
    { from: '90', to: '441', texto: 'Dia 27' },
    { from: '90', to: '442', texto: 'Dia 27' },

    // Abril (91)
    { from: '91', to: '443', texto: 'Dia 4' },
    { from: '91', to: '444', texto: 'Dia 5' },
    { from: '91', to: '445', texto: 'Dia 11' },
    { from: '91', to: '446', texto: 'Dia 13' },
    { from: '91', to: '447', texto: 'Dia 14' },
    { from: '91', to: '448', texto: 'Dia 14' },
    { from: '91', to: '449', texto: 'Dia 17' },
    { from: '91', to: '450', texto: 'Dia 21' },
    { from: '91', to: '4',   texto: 'Dia 22' },
    { from: '91', to: '451', texto: 'Dia 22' },
    { from: '91', to: '7',   texto: 'Dia 23' },
    { from: '91', to: '452', texto: 'Dia 24' },
    { from: '91', to: '453', texto: 'Dia 25' },
    { from: '91', to: '454', texto: 'Dia 26' },
    { from: '91', to: '455', texto: 'Dia 27' },
    { from: '91', to: '456', texto: 'Dia 28' },
    { from: '91', to: '457', texto: 'Dia 28' },
    { from: '91', to: '458', texto: 'Dia 29' },
    { from: '91', to: '459', texto: 'Dia 30' },

    // Maio (92)
    { from: '92', to: '64',  texto: 'Dia 4' },
    { from: '92', to: '112', texto: 'Dia 11' },
    { from: '92', to: '116', texto: 'Dia 11' },
    { from: '92', to: '67',  texto: 'Dia 22' },
    { from: '92', to: '112', texto: 'Dia 1' },
    { from: '92', to: '116', texto: 'Dia 1' },
    { from: '92', to: '600', texto: 'Dia 2' },
    { from: '92', to: '601', texto: 'Dia 5' },
    { from: '92', to: '55', texto: 'Dia 6' },
    { from: '92', to: '602', texto: 'Dia 7' },
    { from: '92', to: '603', texto: 'Dia 8' },
    { from: '92', to: '604', texto: 'Dia 9' },
    { from: '92', to: '605', texto: 'Dia 10' },
    { from: '92', to: '606', texto: 'Dia 10' },
    { from: '92', to: '607', texto: 'Dia 12' },
    { from: '92', to: '608', texto: 'Dia 13' },
    { from: '92', to: '609', texto: 'Dia 13' },
    { from: '92', to: '224', texto: 'Dia 14' },
    { from: '92', to: '610', texto: 'Dia 15' },
    { from: '92', to: '611', texto: 'Dia 16' },
    { from: '92', to: '612', texto: 'Dia 17' },
    { from: '92', to: '613', texto: 'Dia 18' },
    { from: '92', to: '614', texto: 'Dia 19' },
    { from: '92', to: '615', texto: 'Dia 19' },
    { from: '92', to: '616', texto: 'Dia 20' },
    { from: '92', to: '617', texto: 'Dia 25' },
    { from: '92', to: '618', texto: 'Dia 25' },
    { from: '92', to: '619', texto: 'Dia 26' },
    { from: '92', to: '620', texto: 'Dia 26' },
    { from: '92', to: '621', texto: 'Dia 27' },
    { from: '92', to: '622', texto: 'Dia 27' },
    { from: '92', to: '623', texto: 'Dia 28' },
    { from: '92', to: '624', texto: 'Dia 29' },
    { from: '92', to: '625', texto: 'Dia 30' },
    { from: '92', to: '626', texto: 'Dia 30' },
    { from: '92', to: '627', texto: 'Dia 30' },
    { from: '92', to: '628', texto: 'Dia 31' },

    // Junho (93)
    { from: '93', to: '223', texto: 'Dia 2' },
    { from: '93', to: '224', texto: 'Dia 5' },
    { from: '93', to: '225', texto: 'Dia 6' },
    { from: '93', to: '226', texto: 'Dia 9' },
    { from: '93', to: '227', texto: 'Dia 10' },
    { from: '93', to: '228', texto: 'Dia 11' },
    { from: '93', to: '65',  texto: 'Dia 13' },
    { from: '93', to: '229', texto: 'Dia 14' },
    { from: '93', to: '230', texto: 'Dia 15' },
    { from: '93', to: '231', texto: 'Dia 18' },
    { from: '93', to: '232', texto: 'Dia 19' },
    { from: '93', to: '233', texto: 'Dia 19' },
    { from: '93', to: '234', texto: 'Dia 20' },
    { from: '93', to: '235', texto: 'Dia 21' },
    { from: '93', to: '236', texto: 'Dia 22' },
    { from: '93', to: '71',  texto: 'Dia 24' },
    { from: '93', to: '238', texto: 'Dia 25' },
    { from: '93', to: '237', texto: 'Dia 26' },
    { from: '93', to: '239', texto: 'Dia 28' },
    { from: '93', to: '2',   texto: 'Dia 29' },
    { from: '93', to: '3',   texto: 'Dia 29' },

    // Julho (94)
    { from: '94', to: '200', texto: 'Dia 3' },
    { from: '94', to: '201', texto: 'Dia 5' },
    { from: '94', to: '202', texto: 'Dia 7' },
    { from: '94', to: '900', texto: 'Dia 8' },
    { from: '94', to: '204', texto: 'Dia 10' },
    { from: '94', to: '205', texto: 'Dia 11' },
    { from: '94', to: '206', texto: 'Dia 12' },
    { from: '94', to: '207', texto: 'Dia 13' },
    { from: '94', to: '208', texto: 'Dia 14' },
    { from: '94', to: '209', texto: 'Dia 15' },
    { from: '94', to: '210', texto: 'Dia 17' },
    { from: '94', to: '211', texto: 'Dia 18' },
    { from: '94', to: '212', texto: 'Dia 19' },
    { from: '94', to: '213', texto: 'Dia 20' },
    { from: '94', to: '214', texto: 'Dia 21' },
    { from: '94', to: '215', texto: 'Dia 22' },
    { from: '94', to: '216', texto: 'Dia 23' },
    { from: '94', to: '217', texto: 'Dia 24' },
    { from: '94', to: '111', texto: 'Dia 25' },
    { from: '94', to: '218', texto: 'Dia 26' },
    { from: '94', to: '219', texto: 'Dia 27' },
    { from: '94', to: '220', texto: 'Dia 28' },
    { from: '94', to: '221', texto: 'Dia 29' },
    { from: '94', to: '222', texto: 'Dia 30' },
    { from: '94', to: '14',  texto: 'Dia 31' },

    // Agosto (95)
    { from: '95', to: '9',   texto: 'Dia 4' },
    { from: '95', to: '16',  texto: 'Dia 9' },
    { from: '95', to: '11',  texto: 'Dia 12' },
    { from: '95', to: '66',  texto: 'Dia 20' },
    { from: '95', to: '113', texto: 'Dia 24' },
    { from: '95', to: '5',   texto: 'Dia 28' },
    { from: '95', to: '2', texto: 'Dia 1 (Acorrentado)' },
    { from: '95', to: '629', texto: 'Dia 2' },
    { from: '95', to: '630', texto: 'Dia 3' },
    { from: '95', to: '631', texto: 'Dia 5' },
    { from: '95', to: '632', texto: 'Dia 6' },
    { from: '95', to: '633', texto: 'Dia 7' },
    { from: '95', to: '634', texto: 'Dia 8' },
    { from: '95', to: '635', texto: 'Dia 10' },
    { from: '95', to: '636', texto: 'Dia 11' },
    { from: '95', to: '637', texto: 'Dia 13' },
    { from: '95', to: '638', texto: 'Dia 15' },
    { from: '95', to: '639', texto: 'Dia 16' },
    { from: '95', to: '640', texto: 'Dia 17' },
    { from: '95', to: '641', texto: 'Dia 18' },
    { from: '95', to: '642', texto: 'Dia 19' },
    { from: '95', to: '643', texto: 'Dia 21' },
    { from: '95', to: '644', texto: 'Dia 22' },
    { from: '95', to: '645', texto: 'Dia 23' },
    { from: '95', to: '646', texto: 'Dia 25' },
    { from: '95', to: '647', texto: 'Dia 26' },
    { from: '95', to: '648', texto: 'Dia 27' },
    { from: '95', to: '71', texto: 'Dia 29' },
    { from: '95', to: '649', texto: 'Dia 30' },
    { from: '95', to: '650', texto: 'Dia 31' },

    // Setembro (96)
    { from: '96', to: '19',  texto: 'Dia 3' },
    { from: '96', to: '115', texto: 'Dia 21' },
    { from: '96', to: '651', texto: 'Dia 1' },
    { from: '96', to: '652', texto: 'Dia 1' },
    { from: '96', to: '653', texto: 'Dia 2' },
    { from: '96', to: '654', texto: 'Dia 5' },
    { from: '96', to: '655', texto: 'Dia 9' },
    { from: '96', to: '656', texto: 'Dia 10' },
    { from: '96', to: '657', texto: 'Dia 11' },
    { from: '96', to: '658', texto: 'Dia 16' },
    { from: '96', to: '8', texto: 'Dia 17' },
    { from: '96', to: '659', texto: 'Dia 18' },
    { from: '96', to: '660', texto: 'Dia 19' },
    { from: '96', to: '661', texto: 'Dia 20' },
    { from: '96', to: '662', texto: 'Dia 22' },
    { from: '96', to: '663', texto: 'Dia 22' },
    { from: '96', to: '664', texto: 'Dia 23' },
    { from: '96', to: '665', texto: 'Dia 26' },
    { from: '96', to: '666', texto: 'Dia 27' },
    { from: '96', to: '667', texto: 'Dia 28' },
    { from: '96', to: '603', texto: 'Dia 29' },
    { from: '96', to: '668', texto: 'Dia 30' },

    // Outubro (97)
    { from: '97', to: '17',  texto: 'Dia 3' },
    { from: '97', to: '8',   texto: 'Dia 4' },
    { from: '97', to: '12',  texto: 'Dia 15' },
    { from: '97', to: '117', texto: 'Dia 28' },
    { from: '97', to: '118', texto: 'Dia 28' },
    { from: '97', to: '669', texto: 'Dia 1' },
    { from: '97', to: '670', texto: 'Dia 5' },
    { from: '97', to: '671', texto: 'Dia 6' },
    { from: '97', to: '672', texto: 'Dia 8' },
    { from: '97', to: '673', texto: 'Dia 9' },
    { from: '97', to: '674', texto: 'Dia 9' },
    { from: '97', to: '675', texto: 'Dia 10' },
    { from: '97', to: '676', texto: 'Dia 13' },
    { from: '97', to: '677', texto: 'Dia 14' },
    { from: '97', to: '678', texto: 'Dia 16' },
    { from: '97', to: '679', texto: 'Dia 17' },
    { from: '97', to: '680', texto: 'Dia 18' },
    { from: '97', to: '681', texto: 'Dia 19' },
    { from: '97', to: '682', texto: 'Dia 20' },
    { from: '97', to: '683', texto: 'Dia 21' },
    { from: '97', to: '684', texto: 'Dia 21' },
    { from: '97', to: '685', texto: 'Dia 24' },
    { from: '97', to: '686', texto: 'Dia 25' },
    { from: '97', to: '687', texto: 'Dia 26' },

    // Novembro (98)
    { from: '98', to: '13',  texto: 'Dia 24' },
    { from: '98', to: '110', texto: 'Dia 30' },
    { from: '98', to: '688', texto: 'Dia 4' },
    { from: '98', to: '689', texto: 'Dia 6' },
    { from: '98', to: '690', texto: 'Dia 8' },
    { from: '98', to: '691', texto: 'Dia 9' },
    { from: '98', to: '692', texto: 'Dia 10' },
    { from: '98', to: '693', texto: 'Dia 11' },
    { from: '98', to: '694', texto: 'Dia 12' },
    { from: '98', to: '695', texto: 'Dia 13' },
    { from: '98', to: '696', texto: 'Dia 14' },
    { from: '98', to: '697', texto: 'Dia 15' },
    { from: '98', to: '698', texto: 'Dia 16' },
    { from: '98', to: '699', texto: 'Dia 17' },
    { from: '98', to: '2', texto: 'Dia 18' },
    { from: '98', to: '3', texto: 'Dia 18' },
    { from: '98', to: '900', texto: 'Dia 19' },
    { from: '98', to: '700', texto: 'Dia 20' },
    { from: '98', to: '701', texto: 'Dia 22' },
    { from: '98', to: '702', texto: 'Dia 23' },
    { from: '98', to: '703', texto: 'Dia 23' },
    { from: '98', to: '704', texto: 'Dia 24' },
    { from: '98', to: '705', texto: 'Dia 25' },
    { from: '98', to: '706', texto: 'Dia 26' },
    { from: '98', to: '707', texto: 'Dia 26' },
    { from: '98', to: '708', texto: 'Dia 29' },

    // Dezembro (99)
    { from: '99', to: '15',  texto: 'Dia 3' },
    { from: '99', to: '114', texto: 'Dia 21' },
    { from: '99', to: '55',  texto: 'Dia 27' },
    { from: '99', to: '709', texto: 'Dia 2' },
    { from: '99', to: '710', texto: 'Dia 4' },
    { from: '99', to: '711', texto: 'Dia 5' },
    { from: '99', to: '712', texto: 'Dia 6' },
    { from: '99', to: '713', texto: 'Dia 7' },
    { from: '99', to: '714', texto: 'Dia 10' },
    { from: '99', to: '715', texto: 'Dia 11' },
    { from: '99', to: '716', texto: 'Dia 13' },
    { from: '99', to: '717', texto: 'Dia 16' },
    { from: '99', to: '114', texto: 'Dia 19' },
    { from: '99', to: '630', texto: 'Dia 26' },
    { from: '99', to: '718', texto: 'Dia 28' },
    { from: '99', to: '719', texto: 'Dia 29' },
    { from: '99', to: '720', texto: 'Dia 31' },

    // ========== SANTOS -> LOCAIS (REGRAS DE LIGAÇÃO CUMPRIDAS) ==========
    { from: '4',   to: '130', title: 'nasceu em', texto: 'nasceu em' },
    { from: '71',  to: '131', title: 'pregou em', texto: 'pregou em' },
    { from: '2',   to: '26',  title: 'sede / martírio em', texto: 'sede / martírio em' },
    { from: '3',   to: '26',  title: 'martirizado em', texto: 'martirizado em' },
    { from: '55',  to: '132', title: 'atuou em', texto: 'atuou em' },
    { from: '86',  to: '133', title: 'martirizado em', texto: 'martirizado em' },
    { from: '110', to: '155', title: 'martirizado em', texto: 'martirizado em' },
    { from: '111', to: '156', title: 'venerado em', texto: 'venerado em' },
    { from: '112', to: '157', title: 'martirizado em', texto: 'martirizado em' },
    { from: '113', to: '158', title: 'martirizado em', texto: 'martirizado em' },
    { from: '114', to: '159', title: 'evangelizou', texto: 'evangelizou' },
    { from: '115', to: '160', title: 'evangelizou', texto: 'evangelizou' },
    { from: '116', to: '133', title: 'bispo de', texto: 'bispo de' },
    { from: '117', to: '161', title: 'martirizado em', texto: 'martirizado em' },
    { from: '118', to: '161', title: 'martirizado em', texto: 'martirizado em' },
    { from: '228', to: '314', title: 'martirizado em', texto: 'martirizado em' },
    { from: '215', to: '133', title: 'testemunhou em', texto: 'testemunhou em' },
    { from: '218', to: '130', title: 'venerada em', texto: 'venerada em' },
    { from: '221', to: '309', title: 'viveu em', texto: 'viveu em' },
    { from: '73',  to: '26',  title: 'martirizada em', texto: 'martirizada em' },
    { from: '72',  to: '26',  title: 'martirizado em', texto: 'martirizado em' },
    { from: '7',   to: '134', title: 'martirizado em', texto: 'martirizado em' },
    { from: '76',  to: '135', title: 'viveu em', texto: 'viveu em' },
    { from: '74',  to: '135', title: 'viveu em', texto: 'viveu em' },
    { from: '64',  to: '136', title: 'morreu em', texto: 'morreu em' },
    { from: '5',   to: '137', title: 'bispo de', texto: 'bispo de' },
    { from: '81',  to: '138', title: 'bispo de', texto: 'bispo de' },
    { from: '82',  to: '139', title: 'bispo de', texto: 'bispo de' },
    { from: '83',  to: '140', title: 'martirizada em', texto: 'martirizada em' },
    { from: '84',  to: '26',  title: 'martirizado em', texto: 'martirizado em' },
    { from: '204', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '205', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '207', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '210', to: '26',  title: 'viveu em', texto: 'viveu em' },
    { from: '214', to: '26',  title: 'martirizada em', texto: 'martirizada em' },
    { from: '216', to: '310', title: 'bispo de', texto: 'bispo de' },
    { from: '217', to: '307', title: 'martirizada em', texto: 'martirizada em' },
    { from: '219', to: '308', title: 'martirizado em', texto: 'martirizado em' },
    { from: '220', to: '300', title: 'martirizados em', texto: 'martirizados em' },
    { from: '222', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '223', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '226', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '230', to: '140', title: 'martirizados em', texto: 'martirizados em' },
    { from: '233', to: '300', title: 'martirizados em', texto: 'martirizados em' },
    { from: '234', to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '237', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '6',   to: '141', title: 'fundou em', texto: 'fundou em' },
    { from: '85',  to: '141', title: 'viveu em', texto: 'viveu em' },
    { from: '66',  to: '142', title: 'abade de', texto: 'abade de' },
    { from: '8',   to: '143', title: 'nasceu em', texto: 'nasceu em' },
    { from: '11',  to: '143', title: 'viveu em', texto: 'viveu em' },
    { from: '9',   to: '144', title: 'morreu em', texto: 'morreu em' },
    { from: '10',  to: '145', title: 'ensinou em', texto: 'ensinou em' },
    { from: '65',  to: '146', title: 'morreu em', texto: 'morreu em' },
    { from: '67',  to: '147', title: 'viveu em', texto: 'viveu em' },
    { from: '200', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '202', to: '301', title: 'evangelizaram', texto: 'evangelizaram' },
    { from: '203', to: '302', title: 'Princesa de', texto: 'Princesa de' },
    { from: '803', to: '804', title: 'rainha de', texto: 'rainha de' },
    { from: '206', to: '303', title: 'fundou em', texto: 'fundou em' },
    { from: '208', to: '304', title: 'morreu em', texto: 'morreu em' },
    { from: '209', to: '305', title: 'imperador de', texto: 'imperador de' },
    { from: '224', to: '311', title: 'bispo de', texto: 'bispo de' },
    { from: '225', to: '312', title: 'bispo de', texto: 'bispo de' },
    { from: '227', to: '313', title: 'rainha de', texto: 'rainha de' },
    { from: '229', to: '315', title: 'bispo de', texto: 'bispo de' },
    { from: '231', to: '316', title: 'diácono de', texto: 'diácono de' },
    { from: '232', to: '317', title: 'fundou em', texto: 'fundou em' },
    { from: '236', to: '318', title: 'bispo de', texto: 'bispo de' },
    { from: '238', to: '319', title: 'fundou em', texto: 'fundou em' },
    { from: '239', to: '304', title: 'bispo de', texto: 'bispo de' },
    { from: '14',  to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '15',  to: '148', title: 'missionou em', texto: 'missionou em' },
    { from: '12',  to: '149', title: 'nasceu em', texto: 'nasceu em' },
    { from: '13',  to: '150', title: 'morreu em', texto: 'morreu em' },
    { from: '75',  to: '151', title: 'bispo de', texto: 'bispo de' },
    { from: '201', to: '300', title: 'fundou em', texto: 'fundou em' },
    { from: '211', to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '212', to: '320', title: 'atuou em', texto: 'atuou em' },
    { from: '213', to: '306', title: 'fundou em', texto: 'fundou em' },
    { from: '235', to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '16',  to: '152', title: 'pároco de', texto: 'pároco de' },
    { from: '61',  to: '153', title: 'fundou em', texto: 'fundou em' },
    { from: '17',  to: '154', title: 'viveu em', texto: 'viveu em' },
    { from: '19',  to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '400', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '401', to: '500', title: 'bispo de', texto: 'bispo de' },
    { from: '402', to: '318', title: 'atuou em', texto: 'atuou em' },
    { from: '403', to: '501', title: 'abade em', texto: 'abade em' },
    { from: '404', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '405', to: '26',  title: 'martirizada em', texto: 'martirizada em' },
    { from: '406', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '407', to: '502', title: 'martirizado em', texto: 'martirizado em' },
    { from: '408', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '409', to: '503', title: 'martirizados em', texto: 'martirizados em' },
    { from: '410', to: '504', title: 'atuou em', texto: 'atuou em' },
    { from: '411', to: '26',  title: 'martirizada em', texto: 'martirizada em' },
    { from: '412', to: '132', title: 'bispo de', texto: 'bispo de' },
    { from: '413', to: '505', title: 'bispo de', texto: 'bispo de' },
    { from: '414', to: '506', title: 'bispo de', texto: 'bispo de' },
    { from: '415', to: '504', title: 'fundou em', texto: 'fundou em' },
    { from: '416', to: '26',  title: 'martirizada em', texto: 'martirizada em' },
    { from: '417', to: '507', title: 'bispo de', texto: 'bispo de' },
    { from: '418', to: '508', title: 'bispo de', texto: 'bispo de' },
    { from: '419', to: '315', title: 'martirizada em', texto: 'martirizada em' },
    { from: '420', to: '509', title: 'fundou em', texto: 'fundou em' },
    { from: '421', to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '422', to: '510', title: 'bispo de', texto: 'bispo de' },
    { from: '423', to: '510', title: 'martirizada em', texto: 'martirizada em' },
    { from: '424', to: '511', title: 'venerada em', texto: 'venerada em' },
    { from: '425', to: '317', title: 'fundaram em', texto: 'fundaram em' },
    { from: '426', to: '512', title: 'martirizados em', texto: 'martirizados em' },
    { from: '427', to: '133', title: 'bispo de', texto: 'bispo de' },
    { from: '428', to: '513', title: 'abade de', texto: 'abade de' },
    { from: '429', to: '514', title: 'morreu em', texto: 'morreu em' },
    { from: '430', to: '515', title: 'morreu em', texto: 'morreu em' },
    { from: '431', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '432', to: '516', title: 'martirizadas em', texto: 'martirizadas em' },
    { from: '433', to: '517', title: 'fundou em', texto: 'fundou em' },
    { from: '434', to: '26',  title: 'viveu em', texto: 'viveu em' },
    { from: '435', to: '139', title: 'martirizados em', texto: 'martirizados em' },
    { from: '436', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '437', to: '518', title: 'evangelizou', texto: 'evangelizou' },
    { from: '438', to: '133', title: 'bispo de', texto: 'bispo de' },
    { from: '439', to: '26',  title: 'venerado em', texto: 'venerado em' },
    { from: '440', to: '130', title: 'ocorreu em', texto: 'ocorreu em' },
    { from: '441', to: '133', title: 'venerada em', texto: 'venerada em' },
    { from: '442', to: '519', title: 'viveu em', texto: 'viveu em' },
    { from: '443', to: '520', title: 'bispo de', texto: 'bispo de' },
    { from: '444', to: '521', title: 'nasceu em', texto: 'nasceu em' },
    { from: '445', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '446', to: '522', title: 'martirizado em', texto: 'martirizado em' },
    { from: '447', to: '26',  title: 'martirizado em', texto: 'martirizado em' },
    { from: '448', to: '26',  title: 'martirizados em', texto: 'martirizados em' },
    { from: '449', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '450', to: '523', title: 'bispo de', texto: 'bispo de' },
    { from: '451', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '452', to: '524', title: 'martirizado em', texto: 'martirizado em' },
    { from: '453', to: '525', title: 'venerado em', texto: 'venerado em' },
    { from: '454', to: '26',  title: 'sede em', texto: 'sede em' },
    { from: '455', to: '526', title: 'morreu em', texto: 'morreu em' },
    { from: '456', to: '26',  title: 'morreu em', texto: 'morreu em' },
    { from: '457', to: '310', title: 'martirizado em', texto: 'martirizado em' },
    { from: '458', to: '300', title: 'martirizado em', texto: 'martirizado em' },
    { from: '459', to: '527', title: 'viveu em', texto: 'viveu em' },

    // NOVOS SANTOS -> LOCAIS (Adicionado para não quebrar a regra de 100+ santos órfãos)
    { from: '600', to: '510', title: 'bispo de', texto: 'bispo de' },
    { from: '601', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '602', to: '515', title: 'bispo de', texto: 'bispo de' },
    { from: '603', to: '26', title: 'venerado em', texto: 'venerado em' },
    { from: '604', to: '506', title: 'bispo de', texto: 'bispo de' },
    { from: '605', to: '317', title: 'bispo de', texto: 'bispo de' },
    { from: '606', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '607', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '608', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '609', to: '801', title: 'apareceu em', texto: 'apareceu em' },
    { from: '610', to: '320', title: 'fundou em', texto: 'fundou em' },
    { from: '611', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '612', to: '521', title: 'viveu em', texto: 'viveu em' },
    { from: '613', to: '26', title: 'martirizado em', texto: 'martirizado em' },
    { from: '614', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '615', to: '26', title: 'martirizada em', texto: 'martirizada em' },
    { from: '616', to: '527', title: 'viveu em', texto: 'viveu em' },
    { from: '617', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '618', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '619', to: '26', title: 'atuou em', texto: 'atuou em' },
    { from: '620', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '621', to: '523', title: 'viveu em', texto: 'viveu em' },
    { from: '622', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '623', to: '523', title: 'bispo de', texto: 'bispo de' },
    { from: '624', to: '317', title: 'viveu em', texto: 'viveu em' },
    { from: '625', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '626', to: '320', title: 'martirizada em', texto: 'martirizada em' },
    { from: '627', to: '520', title: 'viveu em', texto: 'viveu em' },
    { from: '628', to: '26', title: 'martirizada em', texto: 'martirizada em' },
    { from: '629', to: '145', title: 'fundou em', texto: 'fundou em' },
    { from: '630', to: '133', title: 'martirizado em', texto: 'martirizado em' },
    { from: '631', to: '26', title: 'venerada em', texto: 'venerada em' },
    { from: '632', to: '133', title: 'ocorreu em', texto: 'ocorreu em' },
    { from: '633', to: '145', title: 'fundou em', texto: 'fundou em' },
    { from: '634', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '635', to: '26', title: 'martirizado em', texto: 'martirizado em' },
    { from: '636', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '637', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '638', to: '133', title: 'ocorreu em', texto: 'ocorreu em' },
    { from: '639', to: '130', title: 'viveu em', texto: 'viveu em' },
    { from: '640', to: '515', title: 'evangelizou', texto: 'evangelizou' },
    { from: '641', to: '26', title: 'martirizado em', texto: 'martirizado em' },
    { from: '642', to: '320', title: 'fundou em', texto: 'fundou em' },
    { from: '643', to: '151', title: 'fundou em', texto: 'fundou em' },
    { from: '644', to: '801', title: 'venerado em', texto: 'venerado em' },
    { from: '645', to: '317', title: 'viveu em', texto: 'viveu em' },
    { from: '646', to: '320', title: 'rei em', texto: 'rei em' },
    { from: '647', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '648', to: '26', title: 'fundou em', texto: 'fundou em' },
    { from: '649', to: '145', title: 'viveu em', texto: 'viveu em' },
    { from: '650', to: '504', title: 'atuou em', texto: 'atuou em' },
    { from: '651', to: '320', title: 'abade de', texto: 'abade de' },
    { from: '652', to: '145', title: 'martirizados em', texto: 'martirizados em' },
    { from: '653', to: '301', title: 'rei em', texto: 'rei em' },
    { from: '654', to: '525', title: 'bispo de', texto: 'bispo de' },
    { from: '655', to: '308', title: 'martirizado em', texto: 'martirizado em' },
    { from: '656', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '657', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '658', to: '516', title: 'bispo/mártir em', texto: 'bispo/mártir em' },
    { from: '659', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '660', to: '145', title: 'martirizados em', texto: 'martirizados em' },
    { from: '661', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '662', to: '521', title: 'bispo de', texto: 'bispo de' },
    { from: '663', to: '151', title: 'martirizados em', texto: 'martirizados em' },
    { from: '664', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '665', to: '138', title: 'martirizados em', texto: 'martirizados em' },
    { from: '666', to: '138', title: 'martirizados em', texto: 'martirizados em' },
    { from: '667', to: '301', title: 'rei em', texto: 'rei em' },
    { from: '668', to: '133', title: 'viveu em', texto: 'viveu em' },
    { from: '669', to: '320', title: 'bispo de', texto: 'bispo de' },
    { from: '670', to: '141', title: 'viveu em', texto: 'viveu em' },
    { from: '671', to: '141', title: 'fundou em', texto: 'fundou em' },
    { from: '672', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '673', to: '26', title: 'fundou em', texto: 'fundou em' },
    { from: '674', to: '320', title: 'martirizados em', texto: 'martirizados em' },
    { from: '675', to: '26', title: 'viveu em', texto: 'viveu em' },
    { from: '676', to: '523', title: 'rei em', texto: 'rei em' },
    { from: '677', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '678', to: '301', title: 'viveu em', texto: 'viveu em' },
    { from: '679', to: '320', title: 'viveu em', texto: 'viveu em' },
    { from: '680', to: '138', title: 'viveu em', texto: 'viveu em' },
    { from: '681', to: '149', title: 'viveu em', texto: 'viveu em' },
    { from: '682', to: '515', title: 'viveu em', texto: 'viveu em' },
    { from: '683', to: '133', title: 'viveu em', texto: 'viveu em' },
    { from: '684', to: '311', title: 'martirizadas em', texto: 'martirizadas em' },
    { from: '685', to: '130', title: 'venerado em', texto: 'venerado em' },
    { from: '686', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '687', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '688', to: '300', title: 'bispo de', texto: 'bispo de' },
    { from: '689', to: '320', title: 'viveu em', texto: 'viveu em' },
    { from: '690', to: '26', title: 'martirizados em', texto: 'martirizados em' },
    { from: '691', to: '157', title: 'martirizado em', texto: 'martirizado em' },
    { from: '692', to: '145', title: 'viveu em', texto: 'viveu em' },
    { from: '693', to: '800', title: 'bispo de', texto: 'bispo de' },
    { from: '694', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '695', to: '503', title: 'viveu em', texto: 'viveu em' },
    { from: '696', to: '515', title: 'martirizado em', texto: 'martirizado em' },
    { from: '697', to: '312', title: 'viveu em', texto: 'viveu em' },
    { from: '698', to: '312', title: 'viveu em', texto: 'viveu em' },
    { from: '699', to: '315', title: 'bispo de', texto: 'bispo de' },
    { from: '700', to: '320', title: 'fundou em', texto: 'fundou em' },
    { from: '701', to: '26', title: 'martirizada em', texto: 'martirizada em' },
    { from: '702', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '703', to: '26', title: 'martirizada em', texto: 'martirizada em' },
    { from: '704', to: '26', title: 'martirizado em', texto: 'martirizado em' },
    { from: '705', to: '510', title: 'martirizada em', texto: 'martirizada em' },
    { from: '706', to: '141', title: 'abade em', texto: 'abade em' },
    { from: '707', to: '510', title: 'bispo de', texto: 'bispo de' },
    { from: '708', to: '320', title: 'martirizado em', texto: 'martirizado em' },
    { from: '709', to: '26', title: 'martirizada em', texto: 'martirizada em' },
    { from: '710', to: '310', title: 'bispo de', texto: 'bispo de' },
    { from: '711', to: '133', title: 'abade em', texto: 'abade em' },
    { from: '712', to: '132', title: 'bispo de', texto: 'bispo de' },
    { from: '713', to: '300', title: 'bispo de', texto: 'bispo de' },
    { from: '714', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '715', to: '26', title: 'sede em', texto: 'sede em' },
    { from: '716', to: '140', title: 'martirizada em', texto: 'martirizada em' },
    { from: '717', to: '26', title: 'martirizado em', texto: 'martirizado em' },
    { from: '718', to: '133', title: 'martirizados em', texto: 'martirizados em' },
    { from: '719', to: '523', title: 'bispo / martirizado em', texto: 'bispo / martirizado em' },
    { from: '720', to: '26', title: 'sede em', texto: 'sede em' },

    // CONGREGAÇÕES E OBRAS
    { from: '6', to: '22', title: 'fundou a', texto: 'fundou a' },
    { from: '85', to: '22', title: 'cofundou (ramo feminino)', texto: 'cofundou (ramo feminino)' },
    { from: '22', to: '63', title: 'gerou o ramo', texto: 'gerou o ramo' },
    { from: '8', to: '23', title: 'fundou a', texto: 'fundou a' },
    { from: '9', to: '24', title: 'fundou a', texto: 'fundou a' },
    { from: '14', to: '25', title: 'fundou a', texto: 'fundou a' },
    { from: '12', to: '41', title: 'reformou o', texto: 'reformou o' },
    { from: '61', to: '62', title: 'fundou a', texto: 'fundou a' },
    
    // Membros comuns (Dashed)
    { from: '66', to: '63', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '11', to: '23', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '65', to: '23', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '10', to: '24', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '15', to: '25', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '13', to: '41', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '17', to: '41', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '235', to: '25', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '410', to: '24', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '444', to: '24', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '455', to: '25', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '458', to: '24', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '459', to: '24', title: 'membro de', texto: 'membro de', dashes: true },
    { from: '608', to: '25', title: 'membro da', texto: 'membro da', dashes: true },
    { from: '675', to: '25', title: 'membro da', texto: 'membro da', dashes: true },
    { from: '616', to: '23', title: 'membro da', texto: 'membro da', dashes: true },
    { from: '681', to: '23', title: 'membro da', texto: 'membro da', dashes: true },
    { from: '697', to: '24', title: 'membro da', texto: 'membro da', dashes: true },
    { from: '624', to: '41', title: 'membro do', texto: 'membro do', dashes: true },

    // Obras / Parentescos
    { from: '10', to: '32', title: 'escreveu', texto: 'escreveu' },
    { from: '14', to: '34', title: 'escreveu', texto: 'escreveu' },
    { from: '12', to: '38', title: 'mestra de', texto: 'mestra de' },
    { from: '13', to: '38', title: 'mestre de', texto: 'mestre de' },
    { from: '64', to: '5', title: 'mãe de', texto: 'mãe de', dashes: true },
    { from: '75', to: '61', title: 'inspirou patronato', texto: 'inspirou patronato', dashes: true },
    { from: '85', to: '6', title: 'irmã de', texto: 'irmã de', dashes: true }, 
	
	
	
	
	
	
	
	
	// =========================================================================
    // SANTOS -> ORDENS RELIGIOSAS (Nível 7)
    // =========================================================================
    
    // Ordem Agostiniana (850)
    { from: '5', to: '850', title: 'inspirou / deu regra', texto: 'inspirou' }, // S. Agostinho
    { from: '67', to: '850', title: 'pertenceu a', texto: 'pertenceu a' }, // Sta. Rita
    { from: '656', to: '850', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Nicolau de Tolentino
    { from: '662', to: '850', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Tomás de Vilanova

    // Ordem do Carmo (851)
    { from: '417', to: '851', title: 'pertenceu a', texto: 'pertenceu a' }, // Sto. André Corsini
    { from: '624', to: '851', title: 'pertenceu a', texto: 'pertenceu a' }, // Sta. Maria Madalena de Pazzi

    // Ordem Servita (852)
    { from: '425', to: '852', title: 'fundaram', texto: 'fundaram' }, // 7 Fundadores Servitas
    { from: '645', to: '852', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Filipe Benício

    // Ordem Trinitária (853)
    { from: '421', to: '853', title: 'fundou', texto: 'fundou' }, // S. João da Mata
    { from: '700', to: '853', title: 'co-fundou', texto: 'co-fundou' }, // S. Félix de Valois

    // Ordem Mercedária (854)
    { from: '415', to: '854', title: 'fundou', texto: 'fundou' }, // S. Pedro Nolasco
    { from: '650', to: '854', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Raimundo Nonato

    // Família Vicentina (855)
    { from: '212', to: '855', title: 'fundou', texto: 'fundou' }, // S. Vicente de Paulo

    // Redentoristas (856)
    { from: '629', to: '856', title: 'fundou', texto: 'fundou' }, // Sto. Afonso M. de Ligório

    // Passionistas (857)
    { from: '456', to: '857', title: 'fundou', texto: 'fundou' }, // S. Paulo da Cruz
    { from: '429', to: '857', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Gabriel da V. Dolorosa

    // Oratorianos (858)
    { from: '619', to: '858', title: 'fundou', texto: 'fundou' }, // S. Felipe Néri

    // Lassalistas (859)
    { from: '610', to: '859', title: 'fundou', texto: 'fundou' }, // S. João Batista de La Salle

    // Teatinos (860)
    { from: '633', to: '860', title: 'fundou', texto: 'fundou' }, // S. Caetano
    { from: '692', to: '860', title: 'pertenceu a', texto: 'pertenceu a' }, // Sto. André Avelino

    // Camilianos (861)
    { from: '211', to: '861', title: 'fundou', texto: 'fundou' }, // S. Camilo de Léllis

    // Hospitaleiros (862)
    { from: '433', to: '862', title: 'fundou', texto: 'fundou' }, // S. João de Deus

    // Barnabitas (863)
    { from: '201', to: '863', title: 'fundou', texto: 'fundou' }, // Sto. Antônio Zaccaria

    // Escolápios (864)
    { from: '648', to: '864', title: 'fundou', texto: 'fundou' }, // S. José de Calasanz

    // Visitandinas (865)
    { from: '75', to: '865', title: 'fundou', texto: 'fundou' }, // S. Francisco de Sales
    { from: '643', to: '865', title: 'fundou', texto: 'fundou' }, // Sta. Joana Francisca de Chantal
    { from: '679', to: '865', title: 'pertenceu a', texto: 'pertenceu a' }, // Sta. Margarida Maria Alacoque

    // Ordem Cartuxa (866)
    { from: '671', to: '866', title: 'fundou', texto: 'fundou' }, // S. Bruno

    // Premonstratenses (867)
    { from: '225', to: '867', title: 'fundou', texto: 'fundou' }, // S. Norberto


    // =========================================================================
    // SANTOS -> OBRAS ESCRITAS / DOCUMENTOS (Nível 7)
    // =========================================================================
    
    // Regras Monásticas
    { from: '6', to: '900', title: 'escreveu', texto: 'escreveu' }, // S. Bento -> Regra de S. Bento
    { from: '5', to: '901', title: 'escreveu', texto: 'escreveu' }, // S. Agostinho -> Regra de S. Agostinho
    { from: '229', to: '902', title: 'escreveu', texto: 'escreveu' }, // S. Basílio Magno -> Regra de S. Basílio

    // Espiritualidade e Mística
    { from: '12', to: '903', title: 'escreveu', texto: 'escreveu' }, // Sta. Teresa d'Ávila -> Castelo Interior
    { from: '13', to: '904', title: 'escreveu', texto: 'escreveu' }, // S. João da Cruz -> Noite Escura da Alma
    { from: '17', to: '905', title: 'escreveu', texto: 'escreveu' }, // Sta. Teresinha -> História de uma Alma
    { from: '75', to: '906', title: 'escreveu', texto: 'escreveu' }, // S. Francisco de Sales -> Introdução à Vida Devota
    { from: '459', to: '907', title: 'ditou', texto: 'ditou' }, // Sta. Catarina de Sena -> O Diálogo
    { from: '629', to: '908', title: 'escreveu', texto: 'escreveu' }, // Sto. Afonso M. de Ligório -> As Glórias de Maria
    { from: '8', to: '909', title: 'compôs', texto: 'compôs' }, // S. Francisco -> Cântico das Criaturas

    // Teologia, Filosofia e História
    { from: '5', to: '910', title: 'escreveu', texto: 'escreveu' }, // S. Agostinho -> Confissões
    { from: '5', to: '911', title: 'escreveu', texto: 'escreveu' }, // S. Agostinho -> A Cidade de Deus
    { from: '668', to: '912', title: 'traduziu', texto: 'traduziu' }, // S. Jerônimo -> A Vulgata
    { from: '239', to: '913', title: 'escreveu', texto: 'escreveu' }, // Sto. Irineu -> Contra as Heresias
    { from: '208', to: '914', title: 'escreveu', texto: 'escreveu' }, // S. Boaventura -> Itinerário da Mente para Deus
    { from: '450', to: '915', title: 'escreveu', texto: 'escreveu' }, // Sto. Anselmo -> Proslogion
    { from: '436', to: '916', title: 'escreveu', texto: 'escreveu' }, // S. Gregório Magno -> Regra Pastoral
    { from: '621', to: '917', title: 'escreveu', texto: 'escreveu' }, // S. Beda -> História Eclesiástica
	
	
	
	
	
	

// =========================================================================
    // RELAÇÕES: SANTOS -> FENÔMENOS, RELÍQUIAS E SANTUÁRIOS (Nível 9)
    // =========================================================================
 

    // --- FENÔMENOS MÍSTICOS ---
    // Corpos Incorruptos
    { from: '16', to: '1000', title: 'possui', texto: 'possui' },   // S. João M. Vianney
    { from: '688', to: '1000', title: 'possui', texto: 'possui' },  // S. Carlos Borromeu
    { from: '424', to: '1000', title: 'possui', texto: 'possui' }, // N. Sra. de Lourdes (representando Sta. Bernadette)
    { from: '67', to: '1000', title: 'possui', texto: 'possui' },  // Sta. Rita
    { from: '16', to: '1000', title: 'possui', texto: 'possui' },  // S. João M. Vianney (Cura d'Ars)
    { from: '624', to: '1000', title: 'possui', texto: 'possui' }, // Sta. Maria Madalena de Pazzi
    { from: '212', to: '1000', title: 'coração incorrupto', texto: 'coração incorrupto' }, // S. Vicente de Paulo

    // Estigmas
    { from: '8', to: '1001', title: 'recebeu', texto: 'recebeu' }, // S. Francisco
    { from: '459', to: '1001', title: 'recebeu (invisíveis)', texto: 'recebeu' }, // Sta. Catarina de Sena
    { from: '67', to: '1001', title: 'chaga na testa', texto: 'chaga na testa' }, // Sta. Rita

    // Bilocação
    { from: '61', to: '1002', title: 'experimentou', texto: 'experimentou' }, // S. João Bosco
    { from: '65', to: '1002', title: 'experimentou', texto: 'experimentou' }, // Sto. Antônio
    { from: '619', to: '1002', title: 'experimentou', texto: 'experimentou' }, // S. Felipe Néri
    { from: '629', to: '1002', title: 'experimentou', texto: 'experimentou' }, // Sto. Afonso

    // Levitação
    { from: '659', to: '1003', title: 'famoso por', texto: 'famoso por' }, // S. José de Cupertino
    { from: '12', to: '1003', title: 'experimentou', texto: 'experimentou' }, // Sta. Teresa d'Ávila


    // --- RELÍQUIAS FAMOSAS ---
    { from: '660', to: '1010', title: 'milagre do', texto: 'milagre do' }, // S. Januário -> Sangue
    { from: '219', to: '1010', title: 'milagre do', texto: 'milagre do' }, // S. Pantaleão -> Sangue
    { from: '212', to: '1011', title: 'possui', texto: 'possui' }, // S. Vicente de Paulo -> Coração Incorrupto
    { from: '75', to: '1011', title: 'possui', texto: 'possui' }, // S. Francisco de Sales -> Coração Incorrupto
    { from: '211', to: '1011', title: 'possui', texto: 'possui' }, // S. Camilo de Léllis -> Coração Incorrupto
    { from: '65', to: '1012', title: 'possui', texto: 'possui' }, // Sto. Antônio -> Língua Intacta
    { from: '459', to: '1013', title: 'preservada em Siena', texto: 'preservada' }, // Sta. Catarina de Sena -> Cabeça
    { from: '71', to: '1013', title: 'venerada em Roma/Amiens', texto: 'venerada' }, // S. João Batista -> Cabeça
    { from: '693', to: '1014', title: 'deixou o', texto: 'deixou o' }, // S. Martinho de Tours -> Manto
    { from: '2', to: '1015', title: 'libertado das', texto: 'libertado das' }, // S. Pedro -> Correntes
    { from: '660', to: '1002', title: 'milagre do', texto: 'milagre do' }, // S. Januário -> Sangue Liquefeito
    { from: '219', to: '1002', title: 'milagre do', texto: 'milagre do' }, // S. Pantaleão -> Sangue Liquefeito
    { from: '65', to: '1003', title: 'possui', texto: 'possui' }, // Sto. Antônio -> Língua Intacta
	
    // --- GRANDES SANTUÁRIOS E TÚMULOS ---
    { from: '2', to: '1020', title: 'sepultado na', texto: 'sepultado na' }, // S. Pedro
    { from: '445', to: '1020', title: 'sepultado na', texto: 'sepultado na' }, // S. Leão Magno
    { from: '436', to: '1020', title: 'sepultado na', texto: 'sepultado na' }, // S. Gregório Magno
    { from: '19', to: '1020', title: 'sepultado na', texto: 'sepultado na' }, // S. Pio X
    { from: '111', to: '1021', title: 'sepultado na', texto: 'sepultado na' }, // S. Tiago Maior -> Santiago
    { from: '8', to: '1022', title: 'sepultado na', texto: 'sepultado na' }, // S. Francisco -> Assis
    { from: '11', to: '1022', title: 'sepultada na', texto: 'sepultada na' }, // Sta. Clara -> Assis
    { from: '65', to: '1023', title: 'sepultado na', texto: 'sepultado na' }, // Sto. Antônio -> Pádua
    { from: '3', to: '1024', title: 'sepultado na', texto: 'sepultado na' }, // S. Paulo
    { from: '16', to: '1025', title: 'sepultado no', texto: 'sepultado no' }, // S. João Vianney -> Ars
    { from: '17', to: '1026', title: 'sepultada na', texto: 'sepultada na' }, // Sta. Teresinha -> Lisieux
    { from: '2', to: '1004', title: 'sepultado na', texto: 'sepultado na' }, // S. Pedro -> Basílica de S. Pedro
    { from: '200', to: '1004', title: 'sepultado na', texto: 'sepultado na' }, // S. Leão II (e vários papas)
    { from: '436', to: '1004', title: 'sepultado na', texto: 'sepultado na' }, // S. Gregório Magno
    { from: '111', to: '1005', title: 'sepultado na', texto: 'sepultado na' }, // S. Tiago Maior -> Santiago de Compostela
    { from: '8', to: '1006', title: 'sepultado na', texto: 'sepultado na' },   // S. Francisco -> Basílica de Assis
    { from: '65', to: '1007', title: 'sepultado na', texto: 'sepultado na' },  // Sto. Antônio -> Basílica de Pádua


    // --- ICONOGRAFIA (Símbolos na Arte) ---
    { from: '2', to: '1030', title: 'representado por', texto: 'representado por' }, // S. Pedro -> Chaves
    { from: '3', to: '1031', title: 'representado por', texto: 'representado por' }, // S. Paulo -> Espada
    { from: '626', to: '1031', title: 'representada por', texto: 'representada por' }, // Sta. Joana d'Arc -> Espada
    { from: '4', to: '1032', title: 'representado por', texto: 'representado por' }, // S. José -> Lírio
    { from: '65', to: '1032', title: 'representado por', texto: 'representado por' }, // Sto. Antônio -> Lírio
    { from: '235', to: '1032', title: 'representado por', texto: 'representado por' }, // S. Luís Gonzaga -> Lírio
    { from: '17', to: '1033', title: 'representada por', texto: 'representada por' }, // Sta. Teresinha -> Rosas
    { from: '649', to: '1033', title: 'representada por', texto: 'representada por' }, // Sta. Rosa de Lima -> Rosas
    { from: '419', to: '1033', title: 'representada por', texto: 'representada por' }, // Sta. Dorotéia -> Rosas
    { from: '668', to: '1034', title: 'representado por', texto: 'representado por' }, // S. Jerônimo -> Caveira
    { from: '675', to: '1034', title: 'representado por', texto: 'representado por' }, // S. Francisco de Borja -> Caveira
    { from: '215', to: '1034', title: 'representada por', texto: 'representada por' }, // Sta. Maria Madalena -> Caveira
    { from: '5', to: '1035', title: 'representado por', texto: 'representado por' }, // S. Agostinho -> Livro
    { from: '10', to: '1035', title: 'representado por', texto: 'representado por' }, // S. Tomás de Aquino -> Livro
    { from: '9', to: '1035', title: 'representado por', texto: 'representado por' }, // S. Domingos -> Livro
    { from: '115', to: '1035', title: 'representado por', texto: 'representado por' }, // S. Mateus -> Livro (Evangelho)
    { from: '7', to: '1036', title: 'venceu o', texto: 'venceu o' }, // S. Jorge -> Dragão
    { from: '603', to: '1036', title: 'venceu o', texto: 'venceu o' }, // S. Miguel -> Dragão
    { from: '227', to: '1036', title: 'venceu o', texto: 'venceu o' }, // Sta. Margarida -> Dragão
    { from: '72', to: '1037', title: 'martirizado por', texto: 'martirizado por' }, // S. Sebastião -> Flechas
    { from: '684', to: '1037', title: 'martirizada por', texto: 'martirizada por' }, // Sta. Úrsula -> Flechas
    { from: '635', to: '1038', title: 'martirizado na', texto: 'martirizado na' }, // S. Lourenço -> Grelha
    { from: '71', to: '1039', title: 'representado por', texto: 'representado por' }, // S. João Batista -> Cordeiro
    { from: '73', to: '1039', title: 'representada por', texto: 'representada por' }, // Sta. Inês -> Cordeiro
    { from: '716', to: '1040', title: 'representada por', texto: 'representada por' }, // Sta. Luzia -> Olhos
    { from: '83', to: '1041', title: 'representada por', texto: 'representada por' }, // Sta. Águeda -> Seios
    { from: '423', to: '1042', title: 'representada por', texto: 'representada por' }, // Sta. Apolônia -> Dentes
    { from: '705', to: '1043', title: 'martirizada na', texto: 'martirizada na' }, // Sta. Catarina de Alexandria -> Roda
    { from: '453', to: '1044', title: 'representado por', texto: 'representado por' }, // S. Marcos -> Leão
    { from: '668', to: '1044', title: 'representado por', texto: 'representado por' }, // S. Jerônimo -> Leão
    { from: '55', to: '1045', title: 'representado por', texto: 'representado por' }, // S. João (Evangelista) -> Águia
    { from: '680', to: '1046', title: 'representado por', texto: 'representado por' }, // S. Lucas -> Touro
	
	
	
	// =========================================================================
    // RELAÇÕES 1: SANTOS -> ORDENS E OBRAS ORIGINAIS (Nível 7)
    // =========================================================================
    
    // Ordem Beneditina (22)
    { from: '6', to: '22', title: 'fundou', texto: 'fundou' }, // S. Bento
    { from: '85', to: '22', title: 'co-fundou (Ramo feminino)', texto: 'co-fundou' }, // Sta. Escolástica
    { from: '436', to: '22', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Gregório Magno
    { from: '403', to: '22', title: 'propagou a', texto: 'propagou a' }, // S. Mauro
    { from: '428', to: '22', title: 'reformou a', texto: 'reformador' }, // S. Pedro Damião
    { from: '706', to: '22', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Silvestre (Abade)

    // Ordem Franciscana (23)
    { from: '8', to: '23', title: 'fundou', texto: 'fundou' }, // S. Francisco
    { from: '11', to: '23', title: 'fundou (Clarissas)', texto: 'fundou' }, // Sta. Clara
    { from: '65', to: '23', title: 'pertenceu a', texto: 'pertenceu a' }, // Sto. Antônio
    { from: '208', to: '23', title: 'ministro geral da', texto: 'liderou a' }, // S. Boaventura
    { from: '616', to: '23', title: 'reformou a', texto: 'reformador' }, // S. Bernardino de Sena
    { from: '612', to: '23', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Pascoal Bailão
    { from: '681', to: '23', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Pedro de Alcântara
    { from: '452', to: '23', title: 'pertenceu a (Capuchinho)', texto: 'pertenceu a' }, // S. Fidélis
    { from: '695', to: '23', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Diogo

    // Ordem Dominicana (24)
    { from: '9', to: '24', title: 'fundou', texto: 'fundou' }, // S. Domingos
    { from: '10', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Tomás de Aquino
    { from: '458', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Pedro de Verona
    { from: '444', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Vicente Férrer
    { from: '459', to: '24', title: 'pertenceu a (Terceira)', texto: 'pertenceu a' }, // Sta. Catarina de Sena
    { from: '601', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Pio V
    { from: '640', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Jacinto
    { from: '649', to: '24', title: 'pertenceu a (Terceira)', texto: 'pertenceu a' }, // Sta. Rosa de Lima
    { from: '697', to: '24', title: 'pertenceu a', texto: 'pertenceu a' }, // Sto. Alberto Magno

    // Companhia de Jesus / Jesuítas (25)
    { from: '14', to: '25', title: 'fundou', texto: 'fundou' }, // Sto. Inácio de Loyola
    { from: '15', to: '25', title: 'co-fundou', texto: 'co-fundou' }, // S. Francisco Xavier
    { from: '235', to: '25', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Luís Gonzaga
    { from: '455', to: '25', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Pedro Canísio
    { from: '608', to: '25', title: 'pertenceu a', texto: 'pertenceu a' }, // S. Roberto Belarmino
    { from: '675', to: '25', title: 'superior geral da', texto: 'liderou a' }, // S. Francisco de Borja

    // Família Salesiana (62)
    { from: '61', to: '62', title: 'fundou', texto: 'fundou' }, // S. João Bosco

    // Ordem Cisterciense (63)
    { from: '66', to: '63', title: 'reformou e expandiu', texto: 'expandiu' }, // S. Bernardo

    // Carmelo Descalço (41)
    { from: '12', to: '41', title: 'fundou', texto: 'fundou' }, // Sta. Teresa d'Ávila
    { from: '13', to: '41', title: 'co-fundou', texto: 'co-fundou' }, // S. João da Cruz
    { from: '17', to: '41', title: 'pertenceu a', texto: 'pertenceu a' }, // Sta. Teresinha

    // Obras / Documentos Originais (32, 34, 38)
    { from: '10', to: '32', title: 'escreveu', texto: 'escreveu' }, // S. Tomás -> Suma Teológica
    { from: '14', to: '34', title: 'escreveu', texto: 'escreveu' }, // Sto. Inácio -> Exercícios Espirituais
    { from: '12', to: '38', title: 'mestra da', texto: 'mestra da' }, // Sta. Teresa -> Mística Cristã
    { from: '13', to: '38', title: 'doutor da', texto: 'doutor da' }, // S. João da Cruz -> Mística Cristã


    // =========================================================================
    // RELAÇÕES 2: SANTOS -> GEOGRAFIA DE ATUAÇÃO E MORTE (Nível 8)
    // =========================================================================
    
    // Terra Santa e Oriente
    { from: '4', to: '130', title: 'viveu em', texto: 'viveu em' }, // S. José -> Nazaré
    { from: '440', to: '130', title: 'ocorreu em', texto: 'ocorreu em' }, // Anunciação -> Nazaré
    { from: '71', to: '131', title: 'batizou no', texto: 'batizou no' }, // S. João Batista -> Rio Jordão
    { from: '116', to: '133', title: 'bispo de', texto: 'bispo de' }, // S. Tiago Menor -> Jerusalém
    { from: '630', to: '133', title: 'martirizado em', texto: 'martirizado em' }, // Sto. Estêvão -> Jerusalém
    { from: '55', to: '132', title: 'viveu em', texto: 'viveu em' }, // S. João -> Éfeso
    { from: '13', to: '132', title: 'bispo de (segundo a tradição)', texto: 'bispo de' }, // S. Timóteo -> Éfeso (Correção: O ID 412 é Timóteo. Usarei 412)
    { from: '412', to: '132', title: 'bispo de', texto: 'bispo de' }, // S. Timóteo -> Éfeso
    { from: '600', to: '510', title: 'bispo de', texto: 'bispo de' }, // Sto. Atanásio -> Alexandria
    { from: '422', to: '510', title: 'bispo de', texto: 'bispo de' }, // S. Cirilo -> Alexandria
    { from: '81', to: '138', title: 'bispo de', texto: 'bispo de' }, // S. Inácio -> Antioquia
    { from: '414', to: '506', title: 'bispo de', texto: 'bispo de' }, // S. João Crisóstomo -> Constantinopla
    { from: '604', to: '506', title: 'bispo de', texto: 'bispo de' }, // S. Greg. Nazianzeno -> Constantinopla

    // Roma e Itália
    { from: '2', to: '26', title: 'bispo e mártir em', texto: 'martirizado em' }, // S. Pedro -> Roma
    { from: '3', to: '26', title: 'martirizado em', texto: 'martirizado em' }, // S. Paulo -> Roma
    { from: '635', to: '26', title: 'martirizado em', texto: 'martirizado em' }, // S. Lourenço -> Roma
    { from: '73', to: '26', title: 'martirizada em', texto: 'martirizada em' }, // Sta. Inês -> Roma
    { from: '72', to: '26', title: 'martirizado em', texto: 'martirizado em' }, // S. Sebastião -> Roma
    { from: '6', to: '141', title: 'fundou abadia em', texto: 'fundou abadia' }, // S. Bento -> Monte Cassino
    { from: '8', to: '143', title: 'nasceu/atuou em', texto: 'atuou em' }, // S. Francisco -> Assis
    { from: '11', to: '143', title: 'nasceu/atuou em', texto: 'atuou em' }, // Sta. Clara -> Assis
    { from: '65', to: '146', title: 'faleceu em', texto: 'faleceu em' }, // Sto. Antônio -> Pádua
    { from: '67', to: '147', title: 'viveu em', texto: 'viveu em' }, // Sta. Rita -> Cássia
    { from: '713', to: '300', title: 'bispo de', texto: 'bispo de' }, // Sto. Ambrósio -> Milão
    { from: '688', to: '300', title: 'bispo de', texto: 'bispo de' }, // S. Carlos Borromeu -> Milão
    { from: '236', to: '318', title: 'bispo de', texto: 'bispo de' }, // S. Paulino -> Nola
    { from: '459', to: '527', title: 'nasceu/atuou em', texto: 'atuou em' }, // Sta. Catarina -> Siena
    { from: '61', to: '153', title: 'atuou em', texto: 'atuou em' }, // S. João Bosco -> Turim

    // França (Gália) e Europa
    { from: '16', to: '152', title: 'pároco em', texto: 'pároco em' }, // S. João Vianney -> Ars
    { from: '17', to: '154', title: 'viveu no carmelo de', texto: 'carmelita em' }, // Sta. Teresinha -> Lisieux
    { from: '5', to: '137', title: 'bispo de', texto: 'bispo de' }, // S. Agostinho -> Hipona (África do Norte)
    { from: '424', to: '511', title: 'aparição em', texto: 'apareceu em' }, // N.S. Lourdes -> Lourdes
    { from: '609', to: '801', title: 'aparição em', texto: 'apareceu em' }, // N.S. Fátima -> Fátima
    { from: '626', to: '320', title: 'padroeira de', texto: 'padroeira' }, // Sta. Joana d'Arc -> Paris (padroeira da França)
    { from: '212', to: '320', title: 'atuou e faleceu em', texto: 'faleceu em' }, // S. Vicente de Paulo -> Paris
    { from: '693', to: '800', title: 'bispo de', texto: 'bispo de' }, // S. Martinho -> Tours
    { from: '75', to: '151', title: 'bispo de', texto: 'bispo de' }, // S. Francisco de Sales -> Genebra
    { from: '66', to: '142', title: 'abade de', texto: 'abade de' }, // S. Bernardo -> Claraval
    
	
	
	
    // Inserção Específica para S. Libório
    { from: '721', to: '802', title: 'bispo de', texto: 'bispo de' }, // S. Libório -> Le Mans
	// --- ATRIBUTOS DE HIERARQUIA (Nível 1 -> Santo) ---
    // ATENÇÃO: Substitua 'ID_BISPO' e 'ID_CONFESSOR' pelos IDs numéricos que você usa no seu Nível 1
    { from: 'ID_BISPO', to: '721', title: 'é', texto: 'é' },
    { from: 'ID_CONFESSOR', to: '721', title: 'é', texto: 'é' },

    // --- GEOGRAFIA E RELÍQUIAS (Nível 8) ---
    { from: '721', to: '802', title: 'bispo de', texto: 'bispo de' }, // S. Libório -> Le Mans
    { from: '721', to: '803', title: 'relíquias veneradas em', texto: 'relíquias transladadas para' }, // S. Libório -> Paderborn

    // --- "REDE SOCIAL" DOS SANTOS (Conexões Interpessoais) ---
    // Ele era grande amigo de S. Martinho de Tours (que já está na sua base com o ID 693)
    { from: '721', to: '693', title: 'amigo de (assistido no leito de morte por)', texto: 'amigo de' }, // S. Libório <-> S. Martinho de Tours

    // --- ICONOGRAFIA / SÍMBOLOS NA ARTE (Nível 9) ---
    { from: '721', to: '1047', title: 'representado por (guiou suas relíquias)', texto: 'representado por' }, // S. Libório -> Pavão
    { from: '721', to: '1048', title: 'padroeiro dos doentes dos rins', texto: 'representado por' }, // S. Libório -> Pedras
	
	
	

    // Ibéria (Espanha / Portugal)
    { from: '12', to: '149', title: 'nasceu/atuou em', texto: 'atuou em' }, // Sta. Teresa -> Ávila
    { from: '13', to: '150', title: 'faleceu em', texto: 'faleceu em' }, // S. João da Cruz -> Úbeda
    { from: '111', to: '156', title: 'jaz em', texto: 'jaz em' }, // S. Tiago Maior -> Santiago de Compostela
    { from: '65', to: '302', title: 'atuou em', texto: 'atuou em' }, // Sto. Antônio (de Lisboa) -> Coimbra

    // Missões e Resto do Mundo
    { from: '15', to: '148', title: 'missionário em', texto: 'atuou em' }, // S. Francisco Xavier -> Goa
    { from: '437', to: '518', title: 'evangelizou a', texto: 'evangelizou' }, // S. Patrício -> Irlanda
    { from: '719', to: '523', title: 'arcebispo e mártir em', texto: 'martirizado em' }, // S. Tomás Becket -> Cantuária
    { from: '202', to: '301', title: 'evangelizaram a', texto: 'evangelizaram' }, // Cirilo e Metódio -> Morávia
	
	
	
	
	
	// =========================================================================
    // RELAÇÕES 3: A "REDE SOCIAL" DOS SANTOS (Conexões Interpessoais)
    // =========================================================================

    // --- 1. A FAMÍLIA E OS DISCÍPULOS BÍBLICOS ---
    { from: '218', to: '639', title: 'esposos', texto: 'casados' }, // Sta. Ana <-> S. Joaquim
    { from: '2', to: '110', title: 'irmãos de sangue', texto: 'irmão de' }, // S. Pedro <-> S. André
    { from: '55', to: '111', title: 'irmãos de sangue', texto: 'irmão de' }, // S. João <-> S. Tiago Maior
    { from: '3', to: '412', title: 'mestre e pai espiritual de', texto: 'discipulou' }, // S. Paulo -> S. Timóteo
    { from: '3', to: '418', title: 'mestre de', texto: 'discipulou' }, // S. Paulo -> S. Tito
    { from: '3', to: '228', title: 'companheiros de missão', texto: 'missionário com' }, // S. Paulo <-> S. Barnabé
    { from: '2', to: '453', title: 'ditou seu Evangelho para', texto: 'mestre de' }, // S. Pedro -> S. Marcos Evangelista
    { from: '3', to: '680', title: 'companheiros de missão', texto: 'missionário com' }, // S. Paulo <-> S. Lucas Evangelista
    { from: '55', to: '413', title: 'mestre de', texto: 'discipulou' }, // S. João -> S. Policarpo

    // --- 2. ANTIGUIDADE E PADRES DA IGREJA ---
    { from: '413', to: '239', title: 'mestre de', texto: 'discipulou' }, // S. Policarpo -> Sto. Irineu
    { from: '64', to: '5', title: 'mãe de', texto: 'mãe de' }, // Sta. Mônica -> S. Agostinho
    { from: '713', to: '5', title: 'converteu e batizou', texto: 'batizou' }, // Sto. Ambrósio -> S. Agostinho
    { from: '76', to: '74', title: 'amigos no deserto', texto: 'amigo de' }, // S. Paulo Eremita <-> S. Antão
    { from: '229', to: '604', title: 'grandes amigos (Padres Capadócios)', texto: 'amigo de' }, // S. Basílio Magno <-> S. Gregório Nazianzeno
    { from: '715', to: '668', title: 'encomendou a Vulgata a', texto: 'patrono de' }, // S. Dâmaso I -> S. Jerônimo

    // --- 3. IDADE MÉDIA E ESCOLÁSTICA ---
    { from: '6', to: '85', title: 'irmãos gêmeos', texto: 'irmão de' }, // S. Bento <-> Sta. Escolástica
    { from: '8', to: '9', title: 'contemporâneos (encontro em Roma)', texto: 'amigo de' }, // S. Francisco <-> S. Domingos
    { from: '8', to: '11', title: 'orientador espiritual de', texto: 'inspirou' }, // S. Francisco -> Sta. Clara
    { from: '697', to: '10', title: 'mestre de', texto: 'mestre de' }, // Sto. Alberto Magno -> S. Tomás de Aquino
    { from: '208', to: '10', title: 'amigos e professores em Paris', texto: 'amigo de' }, // S. Boaventura <-> S. Tomás de Aquino
    { from: '646', to: '10', title: 'buscava conselhos com', texto: 'aconselhado por' }, // S. Luís IX -> S. Tomás de Aquino

    // --- 4. ERA MODERNA (A Grande "Rede" de Roma e Espanha) ---
    { from: '14', to: '15', title: 'colegas de quarto e co-fundadores', texto: 'amigo de' }, // Sto. Inácio <-> S. Francisco Xavier
    { from: '12', to: '13', title: 'amigos e co-reformadores', texto: 'amiga de' }, // Sta. Teresa d'Ávila <-> S. João da Cruz
    { from: '619', to: '14', title: 'amigos em Roma', texto: 'amigo de' }, // S. Felipe Néri <-> Sto. Inácio de Loyola
    { from: '619', to: '688', title: 'grandes amigos e colaboradores', texto: 'amigo de' }, // S. Felipe Néri <-> S. Carlos Borromeu
    { from: '608', to: '235', title: 'diretor espiritual de', texto: 'diretor espiritual' }, // S. Roberto Belarmino -> S. Luís Gonzaga
    { from: '75', to: '643', title: 'amigos e co-fundadores', texto: 'amigo de' }, // S. Francisco de Sales <-> Sta. Joana de Chantal
    { from: '212', to: '75', title: 'admirava profundamente', texto: 'discípulo de' }, // S. Vicente de Paulo -> S. Francisco de Sales

    // --- 5. ERA CONTEMPORÂNEA ---
    { from: '61', to: '16', title: 'admirava e correspondia-se com', texto: 'amigo de' }, // S. João Bosco -> S. João M. Vianney
    { from: '75', to: '61', title: 'inspirou o método pastoral de', texto: 'patrono de' } // S. Francisco de Sales -> S. João Bosco (origem do nome "Salesianos")
	
];

module.exports = { todosNos, todosSetas, regras: regrasDoGrafo };
