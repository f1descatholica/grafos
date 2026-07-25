// ============================================================
// REGRAS GRAFO "g-padres-nao-una-cum"
// Migrado do formato antigo (vis.js/renderizarMeuGrafo) para o
// pipeline V11 (build + motor Sigma). Sem barra de filtros por
// enquanto — abre direto com todos os nós ("TODOS").
// ============================================================
var regrasDoGrafo = {
  dicionario: {
    chaveOrdenacao: 'ano',       // ano de sagração episcopal (bispos) ou ordenação (padres) — ausente em vários nós, por enquanto
    agrupamento: 'grupo',        // aqui usamos o próprio campo 'grupo' (bispo/padre/classificacao/instituicao/localizacao) como agrupador de fileira
    mesReferencia: 'mesNumero'   // não usado neste grafo (sem categoria "documento"/mês) — mantido só por compatibilidade com o padrão genérico
  },
  layout: {
    alturaPorFileira: 150,
    numLinhasInternas: 2,
    usaQuebraPorEpoca: false      // desativado por enquanto — datas concentradas no séc. XX/XXI, pouco valor visual
  },
  cores: {}
};













var todosNos = [
// NÍVEL 1: Raízes da Sucessão Apostólica
{ id: 'N19', level: 1, categoria: 'bispo', label: 'Scipione Rebiba', grupo: 'bispo', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N07', level: 1, categoria: 'bispo', label: 'Achille Liénart', grupo: 'bispo', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N14', level: 1, categoria: 'bispo', label: 'Pierre Martin Ngô\nĐình Thục', grupo: 'bispo', font: { color: '#ffffff', size: 14, bold: true } },

// NÍVEL 2: Bispos Fundacionais
{ id: 'N08', level: 2, categoria: 'bispo', label: 'Marcel Lefebvre', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N57', level: 2, categoria: 'bispo', label: 'Antônio de\nCastro Mayer', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N15', level: 2, categoria: 'bispo', label: 'Moisés Carmona', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N_McKenna', level: 2, categoria: 'bispo', label: 'Robert McKenna', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N20', level: 2, categoria: 'bispo', label: 'Aloísio Lorscheider', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N21', level: 2, categoria: 'bispo', label: 'Orani Tempesta', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },

// NÍVEL 3: 2ª Geração de Bispos
{ id: 'N09', level: 3, categoria: 'bispo', label: 'Bernard Fellay', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N10', level: 3, categoria: 'bispo', label: 'Alfonso de Galarreta', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N11', level: 3, categoria: 'bispo', label: 'Richard Williamson', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Tissier', level: 3, categoria: 'bispo', label: 'Bernard Tissier\nde Mallerais', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N16', level: 3, categoria: 'bispo', label: 'Mark Pivarunas', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Sanborn', level: 3, categoria: 'bispo', label: 'Donald Sanborn', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },

// NÍVEL 4: 3ª Geração / Bispos Recentes
{ id: 'N22', level: 4, categoria: 'bispo', label: 'Ernesto Javier Cardozo', grupo: 'bispo', ano: 1980, font: { color: '#ffffff', size: 14 } },
{ id: 'N12', level: 4, categoria: 'bispo', label: 'Jean-Michel Faure', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N13', level: 4, categoria: 'bispo', label: 'Dom Tomás de Aquino\nFerreira da Costa', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Zendejas', level: 4, categoria: 'bispo', label: 'Gerardo Zendejas', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N17', level: 4, categoria: 'bispo', label: 'Daniel Dolan', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Squetino', level: 4, categoria: 'bispo', label: 'Juan José Squetino', grupo: 'bispo', font: { color: '#ffffff', size: 14 } },

// NÍVEL 5: Bispos e Padres (Líderes de Movimentos e Polos)
{ id: 'N18', level: 5, categoria: 'bispo', label: 'Rodrigo da Silva', grupo: 'bispo', ano: 2021, font: { color: '#ffffff', size: 14, bold: true } }, // sagração episcopal 2021 (ordenação sacerdotal 2017)
{ id: 'N23', level: 5, categoria: 'padre', label: 'Elmo (Francisco\nde Paula)', grupo: 'padre', ano: 1985, font: { color: '#ffffff', size: 14 } },
{ id: 'N24', level: 5, categoria: 'padre', label: 'Frei Tiago de\nSão José', grupo: 'padre', ano: 1995, font: { color: '#ffffff', size: 14 } },
{ id: 'N25', level: 5, categoria: 'padre', label: 'João Dorival', grupo: 'padre', ano: 1998, font: { color: '#ffffff', size: 14 } },
{ id: 'N26', level: 5, categoria: 'padre', label: 'Gilberto Ferreira', grupo: 'padre', ano: 2001, font: { color: '#ffffff', size: 14 } },
{ id: 'N55', level: 5, categoria: 'padre', label: 'Gabriel Spínola', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N56', level: 5, categoria: 'padre', label: 'Frei Pedro Maria', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Marcelo', level: 5, categoria: 'padre', label: 'Marcelo Tenório', grupo: 'padre', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N_Joaquim', level: 5, categoria: 'padre', label: 'Dom Joaquim\n(Prior)', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Inacio', level: 5, categoria: 'padre', label: 'Dom Inácio', grupo: 'padre', font: { color: '#ffffff', size: 14 } },

// NÍVEL 6: Padres
{ id: 'N27', level: 6, categoria: 'padre', label: 'José Eduardo de\nOliveira', grupo: 'padre', ano: 2002, font: { color: '#ffffff', size: 14 } },
{ id: 'N28', level: 6, categoria: 'padre', label: 'Leonardo Holtz\nPeixoto (2022)', grupo: 'padre', ano: 2004, font: { color: '#ffffff', size: 14 } },
{ id: 'N29', level: 6, categoria: 'padre', label: 'Anselmo de Oliveira', grupo: 'padre', ano: 2008, font: { color: '#ffffff', size: 14 } },
{ id: 'N30', level: 6, categoria: 'padre', label: 'Angelo Mello de\nCarvalho', grupo: 'padre', ano: 2010, font: { color: '#ffffff', size: 14 } },
{ id: 'N31', level: 6, categoria: 'padre', label: 'Pedro Patrício', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N32', level: 6, categoria: 'padre', label: 'Leandro Neves', grupo: 'padre', ano: 2012, font: { color: '#ffffff', size: 14 } },
{ id: 'N33', level: 6, categoria: 'padre', label: 'Victor Rodrigues', grupo: 'padre', ano: 2015, font: { color: '#ffffff', size: 14 } },
{ id: 'N34', level: 6, categoria: 'padre', label: 'Carlos Zúñiga', grupo: 'padre', ano: 2017, font: { color: '#ffffff', size: 14 } },
{ id: 'N35', level: 6, categoria: 'padre', label: 'Mateus Pereira', grupo: 'padre', ano: 2018, font: { color: '#ffffff', size: 14 } },
{ id: 'N_Jahir', level: 6, categoria: 'padre', label: 'Pe. Jahir', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Thiago', level: 6, categoria: 'padre', label: 'Thiago Bonifácio', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N_Lucas', level: 6, categoria: 'padre', label: 'Lucas Prados', grupo: 'padre', font: { color: '#ffffff', size: 14 } },
{ id: 'N106', level: 6, categoria: 'padre', label: 'João Maria Vianney (2025)', grupo: 'padre', ano: 2025, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N107', level: 6, categoria: 'padre', label: 'Pacífico Maria\n(anunciada 2026)', grupo: 'padre', ano: 2026, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N108', level: 6, categoria: 'padre', label: 'Dimas Maria\n(anunciada 2026)', grupo: 'padre', ano: 2026, font: { color: '#ffffff', size: 14, bold: true } },

// NÍVEL 7: Classificações Teológicas (Os 5 Polos), FSSPX e Bispos Recentes
{ id: 'N04', level: 7, categoria: 'classificacao', label: 'Tradicionalismo\nUna Cum', grupo: 'classificacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N06', level: 7, categoria: 'classificacao', label: 'Resistência\n(Una Cum)', grupo: 'classificacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N01', level: 7, categoria: 'classificacao', label: 'Sedevacantismo\nTotalista', grupo: 'classificacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N02', level: 7, categoria: 'classificacao', label: 'Sedeprivacionismo\n(Cassiciacum)', grupo: 'classificacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N03', level: 7, categoria: 'classificacao', label: 'Independente /\nNão Una Cum Parcial', grupo: 'classificacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N05', level: 7, categoria: 'instituicao', label: 'FSSPX', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },

{ id: 'N101', level: 7, categoria: 'bispo', label: 'Charles McGuire (2022)', grupo: 'bispo', ano: 2022, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N102', level: 7, categoria: 'bispo', label: 'Fernando Altamira (2024)', grupo: 'bispo', ano: 2024, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N103', level: 7, categoria: 'bispo', label: 'Pierre Roy (2024)', grupo: 'bispo', ano: 2024, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N104', level: 7, categoria: 'bispo', label: 'Bede Nkamuke (2023)', grupo: 'bispo', ano: 2023, font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N109', level: 7, categoria: 'bispo', label: 'Merardo Loya (2025)', grupo: 'bispo', ano: 2025, font: { color: '#ffffff', size: 14, bold: true } }, // reconsagração sub conditione 2025 (1ª sagração 2019, ver comentário nas arestas)

// NÍVEL 8: Instituições e Seminários Independentes
{ id: 'SAJM', level: 8, categoria: 'instituicao', label: 'SAJM', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'IMBC', level: 8, categoria: 'instituicao', label: 'Inst. Mater Boni\nConsilii', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'MHTS', level: 8, categoria: 'instituicao', label: 'Most Holy Trinity\nSeminary', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'SGG', level: 8, categoria: 'instituicao', label: 'St. Gertrude\nthe Great', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N64', level: 8, categoria: 'instituicao', label: 'Mosteiro\nda Santa Cruz (1987)', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N50', level: 8, categoria: 'instituicao', label: 'Seminário São José', grupo: 'instituicao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N36', level: 8, categoria: 'instituicao', label: 'Missões Cristo Rei', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N37', level: 8, categoria: 'instituicao', label: 'Mosteiro Santo Elias', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N38', level: 8, categoria: 'instituicao', label: 'Capela São Vicente\nde Paulo', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N39', level: 8, categoria: 'instituicao', label: 'Capelania Santa\nMaria Madalena', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N40', level: 8, categoria: 'instituicao', label: 'Priorado\nSanta Teresinha', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },
{ id: 'N41', level: 8, categoria: 'instituicao', label: 'Capelania N. Sra do\nPerpétuo Socorro', grupo: 'instituicao', font: { color: '#ffffff', size: 14 } },

// NÍVEL 9: Localizações
{ id: 'N60', level: 9, categoria: 'localizacao', label: 'Estados Unidos', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N48', level: 9, categoria: 'localizacao', label: 'França', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N_ITA', level: 9, categoria: 'localizacao', label: 'Itália', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N63', level: 9, categoria: 'localizacao', label: 'Argentina', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N61', level: 9, categoria: 'localizacao', label: 'Canadá', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N62', level: 9, categoria: 'localizacao', label: 'Nigéria', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N_MEX', level: 9, categoria: 'localizacao', label: 'México', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N42', level: 9, categoria: 'localizacao', label: 'B. Horizonte /\nContagem (MG)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N43', level: 9, categoria: 'localizacao', label: 'São Paulo (SP)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N44', level: 9, categoria: 'localizacao', label: 'Rio de Janeiro (RJ)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N_NF', level: 9, categoria: 'localizacao', label: 'Nova Friburgo (RJ)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N45', level: 9, categoria: 'localizacao', label: 'Curitiba (PR)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N46', level: 9, categoria: 'localizacao', label: 'Brasília (DF)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N47', level: 9, categoria: 'localizacao', label: 'Goiás (GO)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N_CG', level: 9, categoria: 'localizacao', label: 'Campo Grande (MS)', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } },
{ id: 'N51', level: 9, categoria: 'localizacao', label: 'Sul do Brasil', grupo: 'localizacao', font: { color: '#ffffff', size: 14, bold: true } }
];












var todosSetas = [
    // -- SUCESSÃO APOSTÓLICA (Linha Contínua + Verbo no Passado) --
    { from: 'N19', to: 'N20', title: 'originou', texto: 'originou' },
    { from: 'N19', to: 'N21', title: 'originou', texto: 'originou' },
    { from: 'N19', to: 'N57', title: 'originou', texto: 'originou' },

    { from: 'N07', to: 'N08', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N14', to: 'N15', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N14', to: 'N_McKenna', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N_McKenna', to: 'N_Sanborn', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N15', to: 'N16', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N15', to: 'N_Squetino', title: 'originou (linha Thuc)', texto: 'originou (linha Thuc)' },
    { from: 'N16', to: 'N17', title: 'consagrou bispo', texto: 'consagrou bispo' },

    { from: 'N08', to: 'N09', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N08', to: 'N10', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N08', to: 'N11', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N08', to: 'N_Tissier', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N57', to: 'N09', title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 'N57', to: 'N10', title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 'N57', to: 'N11', title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 'N57', to: 'N_Tissier', title: 'co-consagrou', texto: 'co-consagrou' },

    { from: 'N11', to: 'N12', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N11', to: 'N13', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N11', to: 'N_Zendejas', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N12', to: 'N13', title: 'co-consagrou', texto: 'co-consagrou' },

    { from: 'N08', to: 'N13', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N08', to: 'N22', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N08', to: 'N23', title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 'N17', to: 'N18', title: 'consagrou bispo 2021', texto: 'consagrou bispo 2021' },
    { from: 'N11', to: 'N18', title: 'ordenou padre 2017', texto: 'ordenou padre 2017' },

    { from: 'N20', to: 'N24', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N09', to: 'N25', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N09', to: 'N26', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N09', to: 'N27', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N09', to: 'N31', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N10', to: 'N32', title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 'N12', to: 'N33', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N12', to: 'N34', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N13', to: 'N29', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N13', to: 'N30', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N13', to: 'N35', title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 'N21', to: 'N28', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N18', to: 'N28', title: 're-ordenou sub conditione', texto: 're-ordenou sub conditione' },

    { from: 'N18', to: 'N101', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N18', to: 'N102', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N18', to: 'N103', title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 'N18', to: 'N104', title: 'consagrou bispo', texto: 'consagrou bispo' },

    // -- Lógica de Sagração Dom Merardo Loya --
    { from: 'N_Squetino', to: 'N109', title: 'consagrou bispo 2019', texto: 'consagrou bispo 2019' },
    { from: 'N18', to: 'N109', title: 're-consagrou sub cond. 2025', texto: 're-consagrou sub cond. 2025' },

    { from: 'N18', to: 'N106', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N18', to: 'N107', title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 'N18', to: 'N108', title: 'ordenou padre', texto: 'ordenou padre' },

    // -- SITUAÇÃO ATUAL: TEOLOGIA, CARGO E LOCAL --
    { from: 'N05', to: 'N04', title: 'adota', texto: 'adota' },
    { from: 'N11', to: 'N06', title: 'fundamenta', texto: 'fundamenta' },
    { from: 'N12', to: 'SAJM', title: 'lidera', texto: 'lidera' },

    { from: 'N09', to: 'N05', title: 'pertence a', texto: 'pertence a' },
    { from: 'N09', to: 'N04', title: 'adota', texto: 'adota' },
    { from: 'N10', to: 'N05', title: 'pertence a', texto: 'pertence a' },
    { from: 'N10', to: 'N04', title: 'adota', texto: 'adota' },
    { from: 'N_Tissier', to: 'N05', title: 'pertence a', texto: 'pertence a' },
    { from: 'N_Tissier', to: 'N04', title: 'adota', texto: 'adota' },

    { from: 'N13', to: 'N64', title: 'lidera', texto: 'lidera' },
    { from: 'N13', to: 'N06', title: 'adota', texto: 'adota' },
    { from: 'N_Joaquim', to: 'N64', title: 'pertence a', texto: 'pertence a' },
    { from: 'N_Inacio', to: 'N64', title: 'pertence a', texto: 'pertence a' },
    { from: 'N12', to: 'N06', title: 'adota', texto: 'adota' },
    { from: 'N_Zendejas', to: 'N06', title: 'adota', texto: 'adota' },

    { from: 'N_Sanborn', to: 'MHTS', title: 'lidera', texto: 'lidera' },
    { from: 'N_Sanborn', to: 'N02', title: 'adota', texto: 'adota' },

    { from: 'N101', to: 'SGG', title: 'lidera', texto: 'lidera' },
    { from: 'N101', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N16', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N16', to: 'N60', title: 'atua em', texto: 'atua em' },

    { from: 'N18', to: 'N50', title: 'lidera', texto: 'lidera' },
    { from: 'N18', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N22', to: 'N36', title: 'lidera', texto: 'lidera' },
    { from: 'N22', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N_Jahir', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N_Jahir', to: 'N51', title: 'atua em', texto: 'atua em' },

    { from: 'N_Marcelo', to: 'N02', title: 'adota', texto: 'adota' },
    { from: 'N_Marcelo', to: 'N_CG', title: 'atua em', texto: 'atua em' },
    { from: 'N_Marcelo', to: 'IMBC', title: 'dialoga com', texto: 'dialoga com' },
    { from: 'IMBC', to: 'N02', title: 'adota', texto: 'adota' },

    { from: 'N_Thiago', to: 'N03', title: 'adota', texto: 'adota' },
    { from: 'N_Lucas', to: 'N03', title: 'adota', texto: 'adota' },
    { from: 'N23', to: 'N03', title: 'adota', texto: 'adota' },
    { from: 'N25', to: 'N03', title: 'adota', texto: 'adota' },
    { from: 'N25', to: 'N36', title: 'auxilia', texto: 'auxilia' },
    { from: 'N27', to: 'N03', title: 'adota', texto: 'adota' },
    { from: 'N27', to: 'N39', title: 'pertence a', texto: 'pertence a' },
    { from: 'N32', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N24', to: 'N37', title: 'pertence a', texto: 'pertence a' },
    { from: 'N24', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N26', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N26', to: 'N38', title: 'pertence a', texto: 'pertence a' },
    { from: 'N26', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N26', to: 'N43', title: 'atua em', texto: 'atua em' },

    { from: 'N28', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N28', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N28', to: 'N51', title: 'atua em', texto: 'atua em' },

    { from: 'N29', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N29', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N29', to: 'N46', title: 'atua em', texto: 'atua em' },
    { from: 'N29', to: 'N47', title: 'atua em', texto: 'atua em' },

    { from: 'N30', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N30', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N31', to: 'N05', title: 'pertence a', texto: 'pertence a' },
    { from: 'N31', to: 'N04', title: 'adota', texto: 'adota' },

    { from: 'N33', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N33', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N33', to: 'N44', title: 'atua em', texto: 'atua em' },

    { from: 'N34', to: 'N36', title: 'auxilia', texto: 'auxilia' },
    { from: 'N34', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N35', to: 'N36', title: 'pertence a', texto: 'pertence a' },
    { from: 'N35', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N35', to: 'N42', title: 'atua em', texto: 'atua em' },

    { from: 'N55', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N55', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N55', to: 'N42', title: 'atua em', texto: 'atua em' },

    { from: 'N56', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N56', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N56', to: 'N43', title: 'atua em', texto: 'atua em' },

    { from: 'N106', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N106', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N107', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N107', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N108', to: 'N50', title: 'pertence a', texto: 'pertence a' },
    { from: 'N108', to: 'N01', title: 'adota', texto: 'adota' },

    { from: 'N102', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N103', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N104', to: 'N01', title: 'adota', texto: 'adota' },
    { from: 'N109', to: 'N01', title: 'adota', texto: 'adota' },

    // -- HISTÓRICO E ROMPIMENTOS (Linha Tracejada + Verbo no Passado) --
    { from: 'N08', to: 'N05', title: 'fundamentou', texto: 'fundamentou', dashes: true },
    { from: 'N17', to: 'SGG', title: 'liderou', texto: 'liderou', dashes: true },
    { from: 'N17', to: 'N01', title: 'adotou', texto: 'adotou', dashes: true },
    { from: 'N_McKenna', to: 'N02', title: 'adotou', texto: 'adotou', dashes: true },
    { from: 'N15', to: 'N01', title: 'adotou', texto: 'adotou', dashes: true },

    { from: 'N109', to: 'N03', title: 'adotou (2019-2025)', texto: 'adotou (2019-2025)', dashes: true },

    { from: 'N06', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N18', to: 'N06', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N18', to: 'MHTS', title: 'foi membro de', texto: 'foi membro de', dashes: true },

    { from: 'N22', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N22', to: 'N06', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N23', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N25', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N26', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N27', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N32', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },

    { from: 'N_Thiago', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 'N_Lucas', to: 'N05', title: 'rompeu com', texto: 'rompeu com', dashes: true },

    { from: 'N33', to: 'N06', title: 'rompeu com', texto: 'rompeu com', dashes: true },

    { from: 'N23', to: 'N43', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N23', to: 'N42', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N26', to: 'N47', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N28', to: 'N36', title: 'atuou em', texto: 'atuou em', dashes: true },
    { from: 'N28', to: 'N44', title: 'atuou em', texto: 'atuou em', dashes: true },
    { from: 'N30', to: 'N43', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N30', to: 'N44', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N31', to: 'N42', title: 'visitou', texto: 'visitou', dashes: true },
    { from: 'N31', to: 'N44', title: 'visitou', texto: 'visitou', dashes: true },

    // -- LOCALIZAÇÕES DAS INSTITUIÇÕES --
    { from: 'N05', to: 'N40', title: 'mantém', texto: 'mantém' },
    { from: 'N05', to: 'N41', title: 'mantém', texto: 'mantém' },

    { from: 'MHTS', to: 'N60', title: 'localizado em', texto: 'localizado em' },
    { from: 'SGG', to: 'N60', title: 'localizado em', texto: 'localizado em' },
    { from: 'SAJM', to: 'N48', title: 'localizado em', texto: 'localizado em' },
    { from: 'IMBC', to: 'N_ITA', title: 'localizado em', texto: 'localizado em' },

    { from: 'N50', to: 'N43', title: 'localizado em', texto: 'localizado em' },
    { from: 'N64', to: 'N_NF', title: 'localizado em', texto: 'localizado em' },
    { from: 'N36', to: 'N42', title: 'localizado em', texto: 'localizado em' },
    { from: 'N37', to: 'N48', title: 'localizado em', texto: 'localizado em' },
    { from: 'N38', to: 'N42', title: 'localizado em', texto: 'localizado em' },
    { from: 'N39', to: 'N45', title: 'localizado em', texto: 'localizado em' },
    { from: 'N40', to: 'N43', title: 'localizado em', texto: 'localizado em' },
    { from: 'N41', to: 'N43', title: 'localizado em', texto: 'localizado em' },

    // -- ATUAÇÃO INTERNACIONAL DOS BISPOS RECENTES --
    { from: 'N101', to: 'N60', title: 'atua em', texto: 'atua em' },
    { from: 'N102', to: 'N63', title: 'atua em', texto: 'atua em' },
    { from: 'N103', to: 'N61', title: 'atua em', texto: 'atua em' },
    { from: 'N104', to: 'N62', title: 'atua em', texto: 'atua em' },
    { from: 'N109', to: 'N_MEX', title: 'atua em', texto: 'atua em' }
];

module.exports = { todosNos, todosSetas, regras: regrasDoGrafo };
