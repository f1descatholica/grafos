
// ============================================================
// REGRAS GRAFO "g-vaticano-ii"
// ============================================================
var regrasDoGrafo = {
  dicionario: {
    chaveOrdenacao: 'ano',
    agrupamento: 'categoria'
  },
  layout: {
    nosPorFileira: 12,
    alturaPorFileira: 150,
    numLinhasInternas: 2,
    usaQuebraPorEpoca: false,
    coresNiveis: {
      1: 'rgba(220, 38, 38, 0.4)',
      2: 'rgba(124, 58, 237, 0.4)'
    }
  },
  cores: {}
};










var todosNos = [
  // ==========================================
  // NÍVEL 1 — SÃO PIO X (1903–1914)
  // ==========================================
  { id: 'Pio-X',        level: 1, categoria: 'papa',       label: 'Pio X', ano: 1903, grupo: 'papa' },
  { id: 'Modernismo',   level: 1, categoria: 'movimento',  label: 'Modernismo Teológico', ano: 1907, grupo: 'modernismo' },
  { id: 'Pascendi',     level: 1, categoria: 'documento',  label: 'Pascendi Dominici Gregis', ano: 1907, grupo: 'documento' },
  { id: 'Juramento-A',  level: 1, categoria: 'documento',  label: 'Juramento Antimodernista', ano: 1910, grupo: 'documento' },

  // ==========================================
  // NÍVEL 2 — PIO XII (1939–1958)
  // ==========================================
  { id: 'Pio-XII',          level: 2, categoria: 'papa',       label: 'Pio XII', ano: 1939, grupo: 'papa' },
  { id: 'Humani-G',         level: 2, categoria: 'documento',  label: 'Humani Generis', ano: 1950, grupo: 'documento' },
  { id: 'Mediator-D',       level: 2, categoria: 'documento',  label: 'Mediator Dei', ano: 1947, grupo: 'documento' },
  { id: 'Mystici-C',        level: 2, categoria: 'documento',  label: 'Mystici Corporis', ano: 1943, grupo: 'documento' },
  { id: 'Reformas-Pio-XII',  level: 2, categoria: 'liturgia',   label: 'Reformas Litúrgicas de Pio XII', ano: 1951, grupo: 'liturgia' },

  // ==========================================
  // NÍVEL 3 — JOÃO XXIII (1958–1963) & CONCÍLIO
  // ==========================================
  { id: 'Joao-XXIII',   level: 3, categoria: 'papa',                label: 'João XXIII', ano: 1958, grupo: 'papa' },
  { id: 'Concilio-V',   level: 3, categoria: 'evento',              label: 'Concílio Vaticano II', ano: 1962, grupo: 'evento' },
  
  // Cardeais Reformistas
  { id: 'Card-Bea',     level: 3, categoria: 'cardeal_reformista',  label: 'Card. Bea', grupo: 'cardeal_reformista' },
  { id: 'Card-Suenens', level: 3, categoria: 'cardeal_reformista',  label: 'Card. Suenens', grupo: 'cardeal_reformista' },
  { id: 'Card-Lercaro', level: 3, categoria: 'cardeal_reformista',  label: 'Card. Lercaro', grupo: 'cardeal_reformista' },
  { id: 'Card-Dopfner', level: 3, categoria: 'cardeal_reformista',  label: 'Card. Döpfner', grupo: 'cardeal_reformista' },
  { id: 'Card-Konig',   level: 3, categoria: 'cardeal_reformista',  label: 'Card. König', grupo: 'cardeal_reformista' },
  { id: 'Card-Alfrink', level: 3, categoria: 'cardeal_reformista',  label: 'Card. Alfrink', grupo: 'cardeal_reformista' },
  { id: 'Card-Frings',  level: 3, categoria: 'cardeal_reformista',  label: 'Card. Frings', grupo: 'cardeal_reformista' },

  // Cardeais Conservadores / Coetus
  { id: 'Card-Ottaviani', level: 3, categoria: 'cardeal_conservador', label: 'Card. Ottaviani', grupo: 'cardeal_conservador' },
  { id: 'Card-Ruffini',   level: 3, categoria: 'cardeal_conservador', label: 'Card. Ruffini', grupo: 'cardeal_conservador' },
  { id: 'Dom-Lefebvre',   level: 3, categoria: 'cardeal_conservador', label: 'Dom Marcel Lefebvre', grupo: 'cardeal_conservador' },
  { id: 'Card-Carli',     level: 3, categoria: 'cardeal_conservador', label: 'Card. Carli', grupo: 'cardeal_conservador' },
  { id: 'Card-Siri',      level: 3, categoria: 'cardeal_conservador', label: 'Card. Siri', grupo: 'cardeal_conservador' },

  // Peritos Teológicos
  { id: 'Karl-R',       level: 3, categoria: 'perito',              label: 'Karl Rahner', grupo: 'perito' },
  { id: 'Yves-C',       level: 3, categoria: 'perito',              label: 'Yves Congar', grupo: 'perito' },
  { id: 'Henri-L',      level: 3, categoria: 'perito',              label: 'Henri de Lubac', grupo: 'perito' },
  { id: 'Joseph-R',     level: 3, categoria: 'perito',              label: 'Joseph Ratzinger', grupo: 'perito' },
  { id: 'Edward-S',     level: 3, categoria: 'perito',              label: 'Edward Schillebeeckx', grupo: 'perito' },
  { id: 'John-M',       level: 3, categoria: 'perito',              label: 'John C. Murray', grupo: 'perito' },

  // ==========================================
  // NÍVEL 4 — PAULO VI (1963–1978) & PÓS-CONCÍLIO
  // ==========================================
  { id: 'Paulo-VI',       level: 4, categoria: 'papa',              label: 'Paulo VI', ano: 1963, grupo: 'papa' },
  { id: 'Sacrosanctum-C', level: 4, categoria: 'documento',         label: 'Sacrosanctum Concilium', ano: 1963, grupo: 'documento' },
  { id: 'Lumen-G',        level: 4, categoria: 'documento',         label: 'Lumen Gentium', ano: 1964, grupo: 'documento' },
  { id: 'Unitatis-R',     level: 4, categoria: 'documento',         label: 'Unitatis Redintegratio', ano: 1964, grupo: 'documento' },
  { id: 'Dei-V',          level: 4, categoria: 'documento',         label: 'Dei Verbum', ano: 1965, grupo: 'documento' },
  { id: 'Gaudium-S',      level: 4, categoria: 'documento',         label: 'Gaudium et Spes', ano: 1965, grupo: 'documento' },
  { id: 'Dignitatis-H',   level: 4, categoria: 'documento',         label: 'Dignitatis Humanae', ano: 1965, grupo: 'documento' },
  { id: 'Nostra-A',       level: 4, categoria: 'documento',         label: 'Nostra Aetate', ano: 1965, grupo: 'documento' },
  
  { id: 'Reforma-L',      level: 4, categoria: 'liturgia',          label: 'Reforma Litúrgica', ano: 1969, grupo: 'pos_concilio' },
  { id: 'Novus-O',        level: 4, categoria: 'liturgia',          label: 'Novus Ordo Missae', ano: 1969, grupo: 'pos_concilio' },
  { id: 'Crise-P',        level: 4, categoria: 'pos_concilio',      label: 'Crise Pós-Conciliar', ano: 1965, grupo: 'pos_concilio' },
  { id: 'Teologia-L',     level: 4, categoria: 'pos_concilio',      label: 'Teologia da Libertação', ano: 1971, grupo: 'pos_concilio' },
  
  { id: 'Seminario-E',    level: 4, categoria: 'tradicionalismo',   label: 'Seminário de Écône', ano: 1970, grupo: 'tradicionalismo' },
  { id: 'Fraternidade-S', level: 4, categoria: 'tradicionalismo',   label: 'Fraternidade São Pio X', ano: 1970, grupo: 'tradicionalismo' },
  { id: 'Declaracao-1974',level: 4, categoria: 'tradicionalismo',   label: 'Declaração de 1974', ano: 1974, grupo: 'tradicionalismo' },

  // ==========================================
  // NÍVEL 5 — JOÃO PAULO II (1978–2005)
  // ==========================================
  { id: 'Joao-Paulo-II',    level: 5, categoria: 'papa',            label: 'João Paulo II', ano: 1978, grupo: 'papa' },
  { id: 'Catecismo-I',      level: 5, categoria: 'pos_concilio',    label: 'Catecismo da Igreja Católica', ano: 1992, grupo: 'pos_concilio' },
  { id: 'Estado-N',         level: 5, categoria: 'tradicionalismo', label: 'Estado de Necessidade', grupo: 'tradicionalismo' },
  { id: 'Consagracoes-1988',level: 5, categoria: 'tradicionalismo', label: 'Consagrações de 1988', ano: 1988, grupo: 'tradicionalismo' },
  { id: 'Comissao-E',       level: 5, categoria: 'pos_concilio',    label: 'Comissão Ecclesia Dei', ano: 1988, grupo: 'pos_concilio' },
  { id: 'Comunidades-T',    level: 5, categoria: 'tradicionalismo', label: 'Comunidades Ecclesia Dei', ano: 1988, grupo: 'tradicionalismo' },

  // ==========================================
  // NÍVEL 6 — BENTO XVI (2005–2013)
  // ==========================================
  { id: 'Bento-XVI',      level: 6, categoria: 'papa',              label: 'Bento XVI', ano: 2005, grupo: 'papa' },
  { id: 'Hermeneutica-C', level: 6, categoria: 'pos_concilio',      label: 'Hermenêutica da Continuidade', ano: 2005, grupo: 'pos_concilio' },
  { id: 'Summorum-P',     level: 6, categoria: 'guerra_liturgica',  label: 'Summorum Pontificum', ano: 2007, grupo: 'guerra_liturgica' },
  { id: 'Missal-1962',    level: 6, categoria: 'liturgia',          label: 'Missal Romano de 1962', ano: 1962, grupo: 'liturgia_tradicional' },
  { id: 'Movimento-T',    level: 6, categoria: 'tradicionalismo',   label: 'Movimento Tradicionalista', grupo: 'tradicionalismo' },

  // ==========================================
  // NÍVEL 7 — FRANCISCO (2013–...)
  // ==========================================
  { id: 'Francisco',      level: 7, categoria: 'papa',              label: 'Francisco', ano: 2013, grupo: 'papa' },
  { id: 'Card-Roche',     level: 7, categoria: 'pos_concilio',      label: 'Card. Arthur Roche', grupo: 'pos_concilio' },
  { id: 'Traditionis-C',  level: 7, categoria: 'guerra_liturgica',  label: 'Traditionis Custodes', ano: 2021, grupo: 'guerra_liturgica' },
  { id: 'Sinodo-S',       level: 7, categoria: 'pos_concilio',      label: 'Sínodo sobre a Sinodalidade', ano: 2021, grupo: 'pos_concilio' },
  { id: 'Amoris-L',       level: 7, categoria: 'pos_concilio',      label: 'Amoris Laetitia / Fiducia Supplicans', ano: 2016, grupo: 'pos_concilio' },

  // ==========================================
  // NÍVEL 8 — LEÃO XIV & FUTURO (2025–2028)
  // ==========================================
  { id: 'Leao-XIV',           level: 8, categoria: 'papa',          label: 'Leão XIV', ano: 2025, grupo: 'papa' },
  { id: 'Agenda-2030',        level: 8, categoria: 'pos_concilio',  label: 'Agenda 2030 / ONU', ano: 2025, grupo: 'pos_concilio' },
  { id: 'Catequeses-Leao-XIV',level: 8, categoria: 'liturgia',      label: 'Catequeses sobre Sacrosanctum Concilium', ano: 2026, grupo: 'leao_xiv' },
  { id: 'Consagracoes-2026',  level: 8, categoria: 'tradicionalismo', label: 'Consagrações de Écône — 2026', ano: 2026, grupo: 'tradicionalismo' },
  { id: 'Dom-Bonny',          level: 8, categoria: 'pos_concilio',  label: 'Dom Johan Bonny', ano: 2026, grupo: 'sinodalidade' },
  { id: 'Plano-O',            level: 8, categoria: 'pos_concilio',  label: 'Ordenação de Casados (Antuérpia)', ano: 2028, grupo: 'sinodalidade' }
];

var todosSetas = [
  // ==========================================
  // 1. PONTIFICADO DE SÃO PIO X (1903–1914)
  // ==========================================
  { from: 'Pio-X', to: 'Modernismo',   title: 'combateu', texto: 'combateu', dashes: true },
  { from: 'Pio-X', to: 'Pascendi',     title: 'promulgou', texto: 'promulgou' },
  { from: 'Pio-X', to: 'Juramento-A',  title: 'instituiu contra o modernismo', texto: 'instituiu' },
  { from: 'Pio-X', to: 'Fraternidade-S', title: 'padroeiro e referência teológica', texto: 'inspira' },
  { from: 'Pascendi', to: 'Gaudium-S',  title: 'condena teses que reapareceriam em', texto: 'condena teses de', dashes: true },
  { from: 'Pascendi', to: 'Dignitatis-H',title: 'condena premissas liberais de', texto: 'condena teses de', dashes: true },

  // ==========================================
  // 2. PONTIFICADO DE PIO XII (1939–1958)
  // ==========================================
  { from: 'Pio-XII', to: 'Humani-G',        title: 'promulgou', texto: 'promulgou' },
  { from: 'Pio-XII', to: 'Mediator-D',      title: 'promulgou sobre a liturgia', texto: 'promulgou' },
  { from: 'Pio-XII', to: 'Mystici-C',       title: 'promulgou sobre a Igreja', texto: 'promulgou' },
  { from: 'Pio-XII', to: 'Reformas-Pio-XII', title: 'iniciou reformas litúrgicas nos anos 50', texto: 'iniciou reformas' },
  { from: 'Humani-G', to: 'Henri-L',        title: 'censurou a Nova Teologia de', texto: 'censurou', dashes: true },
  { from: 'Humani-G', to: 'Yves-C',         title: 'censurou teses ecumênicas de', texto: 'censurou', dashes: true },
  { from: 'Mediator-D', to: 'Sacrosanctum-C',title: 'serviu de base magisterial', texto: 'antecede' },
  { from: 'Mystici-C', to: 'Lumen-G',       title: 'antecedeu eclesiologia de', texto: 'antecede' },

  // ==========================================
  // 3. JOÃO XXIII (1958–1963) & CONCÍLIO VATICANO II
  // ==========================================
  { from: 'Joao-XXIII', to: 'Concilio-V',  title: 'convocou o Concílio Vaticano II', texto: 'convocou' },
  { from: 'Joao-XXIII', to: 'Paulo-VI',    title: 'sucedido por', texto: 'sucedido por' },

  // Ala Reformista -> Concílio
  { from: 'Card-Bea',     to: 'Concilio-V', title: 'liderou ala ecumênica/progressista', texto: 'articulou' },
  { from: 'Card-Suenens', to: 'Concilio-V', title: 'moderador e articulador reformista', texto: 'moderou' },
  { from: 'Card-Lercaro', to: 'Concilio-V', title: 'líder da comissão de liturgia', texto: 'articulou' },
  { from: 'Card-Dopfner', to: 'Concilio-V', title: 'coordenou reformas alemãs', texto: 'articulou' },
  { from: 'Card-Konig',   to: 'Concilio-V', title: 'articulou abertura ao diálogo', texto: 'articulou' },
  { from: 'Card-Alfrink', to: 'Concilio-V', title: 'apoiou ala progressista', texto: 'articulou' },
  { from: 'Card-Frings',  to: 'Concilio-V', title: 'promoveu reformas teológicas com Ratzinger', texto: 'articulou' },

  // Ala Conservadora -> Concílio
  { from: 'Card-Ottaviani', to: 'Concilio-V', title: 'liderou defesa dogmática e oposição a esquemas', texto: 'resistiu', dashes: true },
  { from: 'Card-Ruffini',   to: 'Concilio-V', title: 'contestou teses liberais', texto: 'resistiu', dashes: true },
  { from: 'Dom-Lefebvre',   to: 'Concilio-V', title: 'articulou o Coetus Internationalis Patrum', texto: 'liderou Coetus', dashes: true },
  { from: 'Card-Carli',     to: 'Concilio-V', title: 'opôs-se à colegialidade excessiva', texto: 'resistiu', dashes: true },
  { from: 'Card-Siri',      to: 'Concilio-V', title: 'defendeu a continuidade escolástica', texto: 'resistiu', dashes: true },

  // Peritos -> Concílio
  { from: 'Karl-R',   to: 'Concilio-V', title: 'redigiu esquemas e orientou bispos', texto: 'orientou' },
  { from: 'Yves-C',   to: 'Concilio-V', title: 'redigiu textos sobre Igreja e ecumenismo', texto: 'orientou' },
  { from: 'Henri-L',  to: 'Concilio-V', title: 'reabilitado como perito conciliar', texto: 'influenciou' },
  { from: 'Joseph-R', to: 'Concilio-V', title: 'perito principal do Card. Frings', texto: 'assessorou' },
  { from: 'Edward-S', to: 'Concilio-V', title: 'redigiu análises para episcopado holandês', texto: 'orientou' },
  { from: 'John-M',   to: 'Concilio-V', title: 'articulou o esquema de liberdade religiosa', texto: 'orientou' },

  // Influência Direta em Documentos
  { from: 'Card-Bea',     to: 'Nostra-A',     title: 'liderou redação de', texto: 'redigiu' },
  { from: 'Card-Bea',     to: 'Unitatis-R',   title: 'promoveu decreto ecumênico', texto: 'promoveu' },
  { from: 'Card-Suenens', to: 'Gaudium-S',    title: 'impulsionou redação de', texto: 'impulsionou' },
  { from: 'Card-Suenens', to: 'Lumen-G',      title: 'defendeu colegialidade em', texto: 'defendeu' },
  { from: 'Card-Lercaro', to: 'Sacrosanctum-C',title: 'dirigiu a reforma litúrgica conciliar', texto: 'presidiu' },
  { from: 'Karl-R',       to: 'Lumen-G',      title: 'influenciou eclesiologia de', texto: 'influenciou' },
  { from: 'Yves-C',       to: 'Unitatis-R',   title: 'formatou a teologia ecumênica de', texto: 'formatou' },
  { from: 'Henri-L',      to: 'Dei-V',        title: 'influenciou teologia da Revelação em', texto: 'influenciou' },
  { from: 'Joseph-R',     to: 'Dei-V',        title: 'redigiu revisões para', texto: 'revisou' },
  { from: 'John-M',       to: 'Dignitatis-H', title: 'principal redator de', texto: 'redigiu' },
  
  // Tensões nos Documentos
  { from: 'Card-Ottaviani', to: 'Card-Bea',   title: 'conflito doutrinal direto no Concílio', texto: 'combateu', dashes: true },
  { from: 'Dom-Lefebvre',   to: 'Dignitatis-H',title: 'rejeitou como ruptura com o Magistério', texto: 'rejeitou', dashes: true },
  { from: 'Dom-Lefebvre',   to: 'Gaudium-S',   title: 'rejeitou espírito humanista moderno de', texto: 'rejeitou', dashes: true },
  { from: 'Dom-Lefebvre',   to: 'Unitatis-R',  title: 'rejeitou ecumenismo conciliar', texto: 'rejeitou', dashes: true },

  // ==========================================
  // 4. PONTIFICADO DE PAULO VI (1963–1978)
  // ==========================================
  // Promulgações Conciliares
  { from: 'Paulo-VI', to: 'Sacrosanctum-C', title: 'promulgou', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Lumen-G',        title: 'promulgou com Nota Explicativa Prévia', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Unitatis-R',     title: 'promulgou', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Dei-V',          title: 'promulgou', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Gaudium-S',      title: 'promulgou', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Dignitatis-H',   title: 'promulgou', texto: 'promulgou' },
  { from: 'Paulo-VI', to: 'Nostra-A',       title: 'promulgou', texto: 'promulgou' },

  // Reforma e Ruptura Litúrgica
  { from: 'Sacrosanctum-C', to: 'Reforma-L', title: 'determinou diretrizes para', texto: 'determinou' },
  { from: 'Reforma-L',      to: 'Novus-O',   title: 'resultou na criação do novo rito', texto: 'gerou' },
  { from: 'Paulo-VI',       to: 'Novus-O',   title: 'promulgou em 1969 o Missal Reformado', texto: 'promulgou' },
  
  // Crise Pós-Conciliar e Resistência Tradicionalista
  { from: 'Concilio-V',     to: 'Crise-P',        title: 'deu início ao período de crise pós-conciliar', texto: 'desencadeou' },
  { from: 'Gaudium-S',      to: 'Teologia-L',     title: 'inspirou matriz social e política de', texto: 'inspirou' },
  { from: 'Dom-Lefebvre',   to: 'Seminario-E',    title: 'fundou para preservar sacerdócio tradicional', texto: 'fundou' },
  { from: 'Seminario-E',    to: 'Fraternidade-S', title: 'sede de formação da', texto: 'formou clero da' },
  { from: 'Dom-Lefebvre',   to: 'Declaracao-1974',title: 'publicou manifesto de recusa à Roma modernista', texto: 'publicou' },
  { from: 'Declaracao-1974',to: 'Fraternidade-S', title: 'tornou-se carta de princípios da', texto: 'fundamentou' },
  { from: 'Paulo-VI',       to: 'Dom-Lefebvre',   title: 'suspendeu a divinis Dom Lefebvre em 1976', texto: 'suspendeu a divinis', dashes: true },

  // ==========================================
  // 5. PONTIFICADO DE JOÃO PAULO II (1978–2005)
  // ==========================================
  { from: 'Joao-Paulo-II', to: 'Catecismo-I',      title: 'promulgou síntese doutrinal conciliar', texto: 'promulgou' },
  { from: 'Joao-Paulo-II', to: 'Teologia-L',       title: 'restringiu e censurou via CDF/Ratzinger', texto: 'censurou', dashes: true },
  { from: 'Dom-Lefebvre',  to: 'Estado-N',         title: 'invocou para justificar atos extraordinários', texto: 'invocou' },
  { from: 'Estado-N',      to: 'Consagracoes-1988',title: 'fundamentou a realização das sagrações sem mandato papal', texto: 'fundamentou' },
  { from: 'Dom-Lefebvre',  to: 'Consagracoes-1988',title: 'consagrou quatro bispos em Écône', texto: 'consagrou bispos' },
  { from: 'Joao-Paulo-II', to: 'Consagracoes-1988',title: 'declarou excomunhão por ato cismático', texto: 'excomungou', dashes: true },
  { from: 'Consagracoes-1988', to: 'Fraternidade-S',title: 'garantiu sucessão episcopal da', texto: 'assegurou sucessão' },
  { from: 'Joao-Paulo-II', to: 'Comissao-E',       title: 'criou para acolher dissidentes da FSSPX', texto: 'instituiu' },
  { from: 'Comissao-E',    to: 'Comunidades-T',    title: 'enquadrou canonicamente FSSP, IBP, etc.', texto: 'enquadrou' },
  { from: 'Comunidades-T', to: 'Movimento-T',      title: 'fomentou o crescimento do', texto: 'expandiu' },

  // ==========================================
  // 6. PONTIFICADO DE BENTO XVI (2005–2013)
  // ==========================================
  { from: 'Joseph-R',     to: 'Bento-XVI',      title: 'eleito Sumo Pontífice', texto: 'eleito papa' },
  { from: 'Bento-XVI',    to: 'Hermeneutica-C', title: 'definiu como chave interpretativa do Concílio', texto: 'formulou' },
  { from: 'Bento-XVI',    to: 'Summorum-P',     title: 'promulgou liberalizando a liturgia antiga', texto: 'promulgou' },
  { from: 'Summorum-P',   to: 'Missal-1962',    title: 'reabilitou como Forma Extraordinária', texto: 'reabilitou' },
  { from: 'Summorum-P',   to: 'Novus-O',        title: 'estabeleceu coexistência mútua de ritos', texto: 'coexiste com' },
  { from: 'Summorum-P',   to: 'Movimento-T',    title: 'causou grande expansão mundial do', texto: 'impulsionou' },
  { from: 'Bento-XVI',    to: 'Fraternidade-S', title: 'levantou as excomunhões dos bispos em 2009', texto: 'revogou excomunhões' },

  // ==========================================
  // 7. PONTIFICADO DE FRANCISCO (2013–...)
  // ==========================================
  { from: 'Francisco',     to: 'Traditionis-C',  title: 'promulgou restringindo a missa tradicional', texto: 'promulgou' },
  { from: 'Traditionis-C', to: 'Summorum-P',     title: 'ab-rogou na prática as concessões de', texto: 'ab-rogou', dashes: true },
  { from: 'Traditionis-C', to: 'Missal-1962',    title: 'restringiu severamente a celebração pelo', texto: 'restringiu', dashes: true },
  { from: 'Card-Roche',    to: 'Traditionis-C',  title: 'aplicou com decretos e rescriptos restritivos', texto: 'executou com rigor' },
  { from: 'Traditionis-C', to: 'Comunidades-T',  title: 'restringiu apostolado e ordenações de', texto: 'restringiu', dashes: true },
  { from: 'Traditionis-C', to: 'Fraternidade-S', title: 'aumentou procura e resistência da', texto: 'fortaleceu resistência' },
  { from: 'Francisco',     to: 'Sinodo-S',       title: 'convocou processo global de governança e escuta', texto: 'convocou' },
  { from: 'Lumen-G',       to: 'Sinodo-S',       title: 'utilizado como base da teologia do Povo de Deus', texto: 'fundamenta' },
  { from: 'Francisco',     to: 'Amoris-L',       title: 'promulgou promovendo aberturas morais/pastorais', texto: 'promulgou' },

  // ==========================================
  // 8. PONTIFICADO DE LEÃO XIV & PERSPECTIVAS (2025–2028)
  // ==========================================
  { from: 'Francisco',          to: 'Leao-XIV',           title: 'sucedido por', texto: 'sucedido por' },
  { from: 'Traditionis-C',      to: 'Leao-XIV',           title: 'herdou o regime de restrição litúrgica', texto: 'legou restrições' },
  { from: 'Leao-XIV',           to: 'Agenda-2030',        title: 'discurso alinhado a pautas globais da ONU', texto: 'alinha-se a' },
  { from: 'Leao-XIV',           to: 'Catequeses-Leao-XIV',title: 'promoveu catequeses buscando pacificar a liturgia', texto: 'promoveu' },
  { from: 'Catequeses-Leao-XIV',to: 'Sacrosanctum-C',     title: 'tentativa de reinterpretar e fixar limites de', texto: 'reinterpreta' },
  { from: 'Fraternidade-S',     to: 'Consagracoes-2026',  title: 'realizou novas sagrações episcopais para perpetuação', texto: 'realizou' },
  { from: 'Estado-N',           to: 'Consagracoes-2026',  title: 'reinvocado para justificar as novas sagrações', texto: 'fundamentou' },
  { from: 'Consagracoes-2026',  to: 'Movimento-T',        title: 'reforçou polo de resistência tradicionalista', texto: 'consolidou' },
  { from: 'Dom-Bonny',          to: 'Plano-O',            title: 'anunciou projeto de ordenação de homens casados', texto: 'propôs' },
  { from: 'Sinodo-S',           to: 'Dom-Bonny',          title: 'usado como respaldo para experimentos disciplinares', texto: 'respalda' },
  { from: 'Plano-O',            to: 'Crise-P',            title: 'alimenta novo capítulo da crise eclesial', texto: 'agrava', dashes: true }
];

module.exports = { todosNos, todosSetas, regras: regrasDoGrafo };
