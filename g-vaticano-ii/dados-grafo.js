
// ============================================================
// REGRAS GRAFO "g-vaticano-ii"
// ============================================================
var regrasDoGrafo = {
  dicionario: {
    chaveOrdenacao: 'ano',
    agrupamento: 'categoria' // categoria = grupo em quase todo nó, exceto nível 3 (reformista/conservador/perito, já distintos por grupo)
  },
  layout: {
    nosPorFileira: 12,
    alturaPorFileira: 150,
    numLinhasInternas: 2,
    usaQuebraPorEpoca: false,

    coresSubgruposNivel1: {
      'n1': 'rgba(220, 38, 38, 0.4)'
    }
  },
  cores: {}
};










var todosNos = [
  // ===== NÍVEL 1 — Pio X =====
  { id: 'PX',   level: 1, categoria: 'n1', label: 'Pio X', ano: 1903, grupo: 'papa' },
  { id: 'PASC', level: 1, categoria: 'n1', label: 'Pascendi Dominici Gregis', ano: 1907, grupo: 'documento' },

  // ===== NÍVEL 2 — Pio XII =====
  { id: 'PXII', level: 2, categoria: 'papa', label: 'Pio XII', ano: 1939, grupo: 'papa' },
  { id: 'HG',   level: 2, categoria: 'documento', label: 'Humani Generis', ano: 1950, grupo: 'documento' },
  { id: 'MD',   level: 2, categoria: 'documento', label: 'Mediator Dei', ano: 1947, grupo: 'documento' },
  { id: 'MC',   level: 2, categoria: 'documento', label: 'Mystici Corporis', ano: 1943, grupo: 'documento' },

  // ===== NÍVEL 3 — João XXIII =====
  { id: 'J23', level: 3, categoria: 'papa', label: 'João XXIII', ano: 1958, grupo: 'papa' },
  { id: 'CV2', level: 3, categoria: 'evento', label: 'Concílio Vaticano II (1962-1965)', ano: 1962, grupo: 'evento' },

  { id: 'BEA', level: 3, categoria: 'cardeal_reformista', label: 'Card. Bea', grupo: 'cardeal_reformista' },
  { id: 'SUE', level: 3, categoria: 'cardeal_reformista', label: 'Card. Suenens', grupo: 'cardeal_reformista' },
  { id: 'LER', level: 3, categoria: 'cardeal_reformista', label: 'Card. Lercaro', grupo: 'cardeal_reformista' },
  { id: 'DOE', level: 3, categoria: 'cardeal_reformista', label: 'Card. Döpfner', grupo: 'cardeal_reformista' },
  { id: 'KON', level: 3, categoria: 'cardeal_reformista', label: 'Card. König', grupo: 'cardeal_reformista' },
  { id: 'ALF', level: 3, categoria: 'cardeal_reformista', label: 'Card. Alfrink', grupo: 'cardeal_reformista' },
  { id: 'FRI', level: 3, categoria: 'cardeal_reformista', label: 'Card. Frings', grupo: 'cardeal_reformista' },

  { id: 'OTT', level: 3, categoria: 'cardeal_conservador', label: 'Card. Ottaviani', grupo: 'cardeal_conservador' },
  { id: 'RUF', level: 3, categoria: 'cardeal_conservador', label: 'Card. Ruffini', grupo: 'cardeal_conservador' },
  { id: 'LEF', level: 3, categoria: 'cardeal_conservador', label: 'Dom Marcel Lefebvre', grupo: 'cardeal_conservador' },
  { id: 'CAR', level: 3, categoria: 'cardeal_conservador', label: 'Card. Carli', grupo: 'cardeal_conservador' },
  { id: 'SIR', level: 3, categoria: 'cardeal_conservador', label: 'Card. Siri', grupo: 'cardeal_conservador' },

  { id: 'RAH', level: 3, categoria: 'perito', label: 'Karl Rahner', grupo: 'perito' },
  { id: 'CON', level: 3, categoria: 'perito', label: 'Yves Congar', grupo: 'perito' },
  { id: 'LUB', level: 3, categoria: 'perito', label: 'Henri de Lubac', grupo: 'perito' },
  { id: 'RAT', level: 3, categoria: 'perito', label: 'Joseph Ratzinger', grupo: 'perito' },
  { id: 'SCH', level: 3, categoria: 'perito', label: 'Edward Schillebeeckx', grupo: 'perito' },
  { id: 'MUR', level: 3, categoria: 'perito', label: 'John C. Murray', grupo: 'perito' },

  // ===== NÍVEL 4 — Paulo VI =====
  { id: 'P6', level: 4, categoria: 'papa', label: 'Paulo VI', ano: 1963, grupo: 'papa' },
  { id: 'SC', level: 4, categoria: 'documento', label: 'Sacrosanctum Concilium', ano: 1963, grupo: 'documento' },
  { id: 'LG', level: 4, categoria: 'documento', label: 'Lumen Gentium', ano: 1964, grupo: 'documento' },
  { id: 'DV', level: 4, categoria: 'documento', label: 'Dei Verbum', ano: 1965, grupo: 'documento' },
  { id: 'GS', level: 4, categoria: 'documento', label: 'Gaudium et Spes', ano: 1965, grupo: 'documento' },
  { id: 'DH', level: 4, categoria: 'documento', label: 'Dignitatis Humanae', ano: 1965, grupo: 'documento' },
  { id: 'NA', level: 4, categoria: 'documento', label: 'Nostra Aetate', ano: 1965, grupo: 'documento' },
  { id: 'UR', level: 4, categoria: 'documento', label: 'Unitatis Redintegratio', ano: 1964, grupo: 'documento' },
  { id: 'NOM', level: 4, categoria: 'pos_concilio', label: 'Novus Ordo Missae', ano: 1969, grupo: 'pos_concilio' },
  { id: 'TL', level: 4, categoria: 'pos_concilio', label: 'Teologia da Libertação', grupo: 'pos_concilio' },
  { id: 'FSSPX', level: 4, categoria: 'pos_concilio', label: 'Fraternidade São Pio X', ano: 1970, grupo: 'pos_concilio' },

  // ===== NÍVEL 5 — João Paulo II =====
  { id: 'JP2', level: 5, categoria: 'papa', label: 'João Paulo II', ano: 1978, grupo: 'papa' },
  { id: 'CAT', level: 5, categoria: 'pos_concilio', label: 'Catecismo da Igreja Católica', ano: 1992, grupo: 'pos_concilio' },
  { id: 'ED', level: 5, categoria: 'pos_concilio', label: 'Comissão Ecclesia Dei', ano: 1988, grupo: 'pos_concilio' },

  // ===== NÍVEL 6 — Bento XVI =====
  { id: 'B16', level: 6, categoria: 'papa', label: 'Bento XVI', ano: 2005, grupo: 'papa' },
  { id: 'HER', level: 6, categoria: 'pos_concilio', label: 'Hermenêutica da Continuidade', ano: 2005, grupo: 'pos_concilio' },
  { id: 'SUM', level: 6, categoria: 'guerra_liturgica', label: 'Summorum Pontificum', ano: 2007, grupo: 'guerra_liturgica' },


  // ===== NÍVEL 7 — Francisco =====
  { id: 'FR', level: 7, categoria: 'papa', label: 'Francisco', ano: 2013, grupo: 'papa' },
  { id: 'SIN', level: 7, categoria: 'pos_concilio', label: 'Sínodo sobre a Sinodalidade', ano: 2021, grupo: 'pos_concilio' },
  { id: 'TC', level: 7, categoria: 'guerra_liturgica', label: 'Traditionis Custodes', ano: 2021, grupo: 'guerra_liturgica' },
  { id: 'AMO', level: 7, categoria: 'pos_concilio', label: 'Amoris Laetitia / Fiducia Supplicans', grupo: 'pos_concilio' },

  // ===== NÍVEL 8 — Leão XIV =====
  { id: 'L14', level: 8, categoria: 'papa', label: 'Leão XIV', ano: 2025, grupo: 'papa' },
  { id: 'AG30', level: 8, categoria: 'pos_concilio', label: 'Agenda 2030 / ODS da ONU', ano: 2025, grupo: 'pos_concilio' }
];















var todosSetas = [
  // ---- Pio X / Pio XII: raízes de oposição/antecedência ----
  { from: 'PX', to: 'PASC', title: 'publicou', texto: 'publicou' },
  { from: 'PASC', to: 'GS', title: 'condena a abertura que viria a', texto: 'condena abertura de', dashes: true },
  { from: 'PASC', to: 'DH', title: 'condena a abertura que viria a', texto: 'condena abertura de', dashes: true },
  { from: 'PXII', to: 'HG', title: 'publicou', texto: 'publicou' },
  { from: 'PXII', to: 'MD', title: 'publicou', texto: 'publicou' },
  { from: 'PXII', to: 'MC', title: 'publicou', texto: 'publicou' },
  { from: 'HG', to: 'LUB', title: 'condenou a Nova Teologia de', texto: 'condenou', dashes: true },
  { from: 'HG', to: 'CON', title: 'condenou a Nova Teologia de', texto: 'condenou', dashes: true },
  { from: 'MD', to: 'SC', title: 'antecede/influencia', texto: 'antecede' },
  { from: 'MC', to: 'LG', title: 'antecede/influencia', texto: 'antecede' },

  // ---- João XXIII / Concílio ----
  { from: 'J23', to: 'CV2', title: 'convocou', texto: 'convocou' },
  { from: 'J23', to: 'SC', title: 'convocou', texto: 'convocou' },
  { from: 'J23', to: 'LG', title: 'convocou', texto: 'convocou' },
  { from: 'J23', to: 'P6', title: 'abriu o Concílio, sucedido por', texto: 'sucedido por' },

  { from: 'BEA', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'SUE', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'LER', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'DOE', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'KON', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'ALF', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },
  { from: 'FRI', to: 'CV2', title: 'dominou agenda (ala reformista)', texto: 'participou (reformista)' },

  { from: 'OTT', to: 'CV2', title: 'resistência e oposição', texto: 'resistiu', dashes: true },
  { from: 'RUF', to: 'CV2', title: 'resistência e oposição', texto: 'resistiu', dashes: true },
  { from: 'LEF', to: 'CV2', title: 'resistência e oposição', texto: 'resistiu', dashes: true },
  { from: 'CAR', to: 'CV2', title: 'resistência e oposição', texto: 'resistiu', dashes: true },
  { from: 'SIR', to: 'CV2', title: 'resistência e oposição', texto: 'resistiu', dashes: true },

  { from: 'RAH', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },
  { from: 'CON', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },
  { from: 'LUB', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },
  { from: 'RAT', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },
  { from: 'SCH', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },
  { from: 'MUR', to: 'CV2', title: 'escreveu textos base', texto: 'escreveu textos base', dashes: true },

  // ---- Pessoa -> documento específico (recuperado da versão original) ----
  { from: 'BEA', to: 'NA', title: 'liderou elaboração', texto: 'liderou elaboração' },
  { from: 'BEA', to: 'UR', title: 'promoveu ecumenismo', texto: 'promoveu ecumenismo' },
  { from: 'SUE', to: 'GS', title: 'moderador do Concílio', texto: 'moderador do Concílio' },
  { from: 'SUE', to: 'LG', title: 'defendeu colegialidade', texto: 'defendeu colegialidade' },
  { from: 'LER', to: 'SC', title: 'presidiu comissão litúrgica', texto: 'presidiu comissão litúrgica' },
  { from: 'DOE', to: 'GS', title: 'coordenou reformas', texto: 'coordenou reformas' },
  { from: 'KON', to: 'GS', title: 'apoiou abertura', texto: 'apoiou abertura' },
  { from: 'ALF', to: 'LG', title: 'apoiou reformas', texto: 'apoiou reformas' },
  { from: 'RAH', to: 'LG', title: 'consultor teológico', texto: 'consultor teológico' },
  { from: 'RAH', to: 'GS', title: 'influenciou', texto: 'influenciou' },
  { from: 'CON', to: 'LG', title: 'influenciou', texto: 'influenciou' },
  { from: 'CON', to: 'UR', title: 'influenciou', texto: 'influenciou' },
  { from: 'LUB', to: 'DV', title: 'influenciou', texto: 'influenciou' },
  { from: 'LUB', to: 'GS', title: 'influenciou', texto: 'influenciou' },
  { from: 'RAT', to: 'DV', title: 'perito de Frings', texto: 'perito de Frings' },
  { from: 'RAT', to: 'LG', title: 'contribuiu', texto: 'contribuiu' },
  { from: 'SCH', to: 'SC', title: 'consultor', texto: 'consultor' },
  { from: 'SCH', to: 'GS', title: 'consultor', texto: 'consultor' },
  { from: 'MUR', to: 'DH', title: 'defendeu liberdade religiosa', texto: 'defendeu liberdade religiosa' },
  { from: 'OTT', to: 'LG', title: 'opôs-se a mudanças', texto: 'opôs-se a mudanças', dashes: true },
  { from: 'OTT', to: 'DH', title: 'criticou', texto: 'criticou', dashes: true },
  { from: 'OTT', to: 'GS', title: 'criticou', texto: 'criticou', dashes: true },
  { from: 'RUF', to: 'NA', title: 'contestou', texto: 'contestou', dashes: true },
  { from: 'RUF', to: 'DH', title: 'contestou', texto: 'contestou', dashes: true },
  { from: 'LEF', to: 'DH', title: 'opôs-se', texto: 'opôs-se', dashes: true },
  { from: 'LEF', to: 'GS', title: 'opôs-se', texto: 'opôs-se', dashes: true },
  { from: 'LEF', to: 'LG', title: 'opôs-se', texto: 'opôs-se', dashes: true },
  { from: 'CAR', to: 'LG', title: 'contestou colegialidade', texto: 'contestou colegialidade', dashes: true },
  { from: 'SIR', to: 'GS', title: 'posição conservadora', texto: 'posição conservadora', dashes: true },
  { from: 'SIR', to: 'DH', title: 'posição conservadora', texto: 'posição conservadora', dashes: true },

  // ---- Relações interpessoais ----
  { from: 'BEA', to: 'CON', title: 'trabalhou com', texto: 'trabalhou com' },
  { from: 'BEA', to: 'LUB', title: 'trabalhou com', texto: 'trabalhou com' },
  { from: 'SUE', to: 'RAH', title: 'colaborou com', texto: 'colaborou com' },
  { from: 'SUE', to: 'CON', title: 'colaborou com', texto: 'colaborou com' },
  { from: 'OTT', to: 'BEA', title: 'liderou oposição a', texto: 'liderou oposição a', dashes: true },
  { from: 'OTT', to: 'SUE', title: 'liderou oposição a', texto: 'liderou oposição a', dashes: true },

  // ---- Paulo VI: promulgações ----
  { from: 'P6', to: 'SC', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'LG', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'DV', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'GS', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'DH', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'NA', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'UR', title: 'promulgou', texto: 'promulgou' },
  { from: 'P6', to: 'SUE', title: 'nomeou moderador', texto: 'nomeou moderador' },
  { from: 'P6', to: 'LER', title: 'apoiou comissão', texto: 'apoiou comissão' },

  // ---- Pós-concílio (Paulo VI) ----
  { from: 'SC', to: 'NOM', title: 'gerou a reforma litúrgica', texto: 'gerou reforma litúrgica' },
  { from: 'GS', to: 'TL', title: 'inspirou abertura social', texto: 'inspirou abertura social' },
  { from: 'DH', to: 'FSSPX', title: 'rejeitado pelos tradicionalistas', texto: 'rejeitado por', dashes: true },
  { from: 'NOM', to: 'FSSPX', title: 'rejeitado pelos tradicionalistas', texto: 'rejeitado por', dashes: true },
  { from: 'LEF', to: 'FSSPX', title: 'fundou', texto: 'fundou' },

  // ---- João Paulo II ----
  { from: 'JP2', to: 'CAT', title: 'promulgou síntese oficial', texto: 'promulgou síntese oficial' },
  { from: 'JP2', to: 'LEF', title: 'excomungou por sagrações', texto: 'excomungou por sagrações' },
  { from: 'FSSPX', to: 'LEF', title: 'cisma formalizado por', texto: 'cisma formalizado por' },
  { from: 'JP2', to: 'ED', title: 'criou alternativa à FSSPX', texto: 'criou alternativa à FSSPX' },
  { from: 'TL', to: 'JP2', title: 'condenada e freada por', texto: 'condenada e freada por', dashes: true },

  // ---- Bento XVI ----
  { from: 'RAT', to: 'B16', title: 'eleito papa', texto: 'eleito papa' },
  { from: 'B16', to: 'HER', title: 'filosofia de governo', texto: 'filosofia de governo' },
  { from: 'B16', to: 'SUM', title: 'ato de reconciliação', texto: 'ato de reconciliação' },
  { from: 'B16', to: 'LEF', title: 'excomunhão anulada', texto: 'excomunhão anulada' },


  // ---- Francisco ----
  { from: 'FR', to: 'SIN', title: 'expande radicalmente a pastoral de CV2', texto: 'expande pastoral de CV2' },
  { from: 'FR', to: 'TC', title: 'reverteu as políticas de Bento XVI', texto: 'reverteu políticas de Bento XVI' },
  { from: 'FR', to: 'AMO', title: 'avanço moral/pastoral', texto: 'avanço moral/pastoral' },
  { from: 'SUM', to: 'TC', title: 'revogado na prática por', texto: 'revogado na prática por', dashes: true },
  { from: 'TC', to: 'FSSPX', title: 'revolta a resistência tradicionalista', texto: 'revolta resistência', dashes: true },
  { from: 'LG', to: 'SIN', title: 'base teológica para', texto: 'base teológica para' },

  // ---- Conexões críticas longas ----
  { from: 'NOM', to: 'SUM', title: 'concorre diretamente contra', texto: 'concorre diretamente contra', dashes: true },
  { from: 'CAT', to: 'HER', title: 'ignorado pelas extremas esquerda/direita', texto: 'ignorado pelas extremas', dashes: true },

  // ---- Leão XIV ----
  { from: 'L14', to: 'AG30', title: 'discurso alinhado à Agenda 2030/ODS (segundo InfoVaticana)', texto: 'adere / discurso alinhado a' }
];

module.exports = { todosNos, todosSetas, regras: regrasDoGrafo };
