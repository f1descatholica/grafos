
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
    nosPorFileira: 8,             // grafo menor que "g-santos" — fileiras mais curtas evitam 1 fila única muito esticada
    alturaPorFileira: 150,
    numLinhasInternas: 2,
    usaQuebraPorEpoca: false,     // desativado por enquanto — datas concentradas no séc. XX/XXI, pouco valor visual
    // 2026-08-10: nível 1 unificado (antigos níveis 1 "Raízes da
    // Sucessão Apostólica" + 2 "Bispos Fundacionais"), diferenciados
    // por grupo/categoria — mesmo padrão de cor já usado no g-santos.
    rotulosSubgruposNivel1: {
      'bispo': 'Raízes da Sucessão Apostólica',
      'bispo-fundacional': 'Bispos Fundacionais'
    },
    coresSubgruposNivel1: {
      'bispo': 'rgba(220, 38, 38, 0.4)',
      'bispo-fundacional': 'rgba(124, 58, 237, 0.4)'
    }
  },
  cores: {}
};











// github dados grafo-padres-nao-una-cum

var todosNos = [
// NÍVEL 1: Raízes da Sucessão Apostólica

{ id: 1, level: 1, categoria: 'bispo', label: 'Scipione Rebiba', grupo: 'bispo' },
{ id: 2, level: 1, categoria: 'bispo', label: 'Achille Liénart', grupo: 'bispo' },
{ id: 3, level: 1, categoria: 'bispo', label: 'Pierre Martin Ngô\nĐình Thục', grupo: 'bispo' },

// NÍVEL 1: Bispos Fundacionais (unificado ao nível 1 em 2026-08-10, categoria/grupo próprios para gerar faixa colorida distinta)

{ id: 4, level: 1, categoria: 'bispo-fundacional', label: 'Marcel Lefebvre', grupo: 'bispo-fundacional' },
{ id: 5, level: 1, categoria: 'bispo-fundacional', label: 'Antônio de\nCastro Mayer', grupo: 'bispo-fundacional' },
{ id: 6, level: 1, categoria: 'bispo-fundacional', label: 'Moisés Carmona', grupo: 'bispo-fundacional' },
{ id: 7, level: 1, categoria: 'bispo-fundacional', label: 'Robert McKenna', grupo: 'bispo-fundacional' },
{ id: 8, level: 1, categoria: 'bispo-fundacional', label: 'Aloísio Lorscheider', grupo: 'bispo-fundacional' },
{ id: 9, level: 1, categoria: 'bispo-fundacional', label: 'Orani Tempesta', grupo: 'bispo-fundacional' },

// NÍVEL 3: 2ª Geração de Bispos

{ id: 10, level: 3, categoria: 'bispo', label: 'Bernard Fellay', grupo: 'bispo' },
{ id: 11, level: 3, categoria: 'bispo', label: 'Alfonso de Galarreta', grupo: 'bispo' },
{ id: 12, level: 3, categoria: 'bispo', label: 'Richard Williamson', grupo: 'bispo' },
{ id: 13, level: 3, categoria: 'bispo', label: 'Bernard Tissier\nde Mallerais', grupo: 'bispo' },
{ id: 14, level: 3, categoria: 'bispo', label: 'Mark Pivarunas', grupo: 'bispo' },
{ id: 15, level: 3, categoria: 'bispo', label: 'Donald Sanborn', grupo: 'bispo' },



// NÍVEL 4: 3ª Geração / Bispos Recentes

{ id: 16, level: 4, categoria: 'bispo', label: 'Ernesto Javier Cardozo', grupo: 'bispo', ano: 1980 },
{ id: 17, level: 4, categoria: 'bispo', label: 'Jean-Michel Faure', grupo: 'bispo' },
{ id: 18, level: 4, categoria: 'bispo', label: 'Dom Tomás de Aquino\nFerreira da Costa', grupo: 'bispo' },
{ id: 19, level: 4, categoria: 'bispo', label: 'Gerardo Zendejas', grupo: 'bispo' },
{ id: 20, level: 4, categoria: 'bispo', label: 'Daniel Dolan', grupo: 'bispo' },
{ id: 21, level: 4, categoria: 'bispo', label: 'Juan José Squetino', grupo: 'bispo' },




// NÍVEL 5: Bispos SUPER recentes

{ id: 22, level: 5, categoria: 'bispo', label: 'Rodrigo da Silva', grupo: 'bispo', ano: 2021 }, // sagração episcopal 2021 (ordenação sacerdotal 2017)

{ id: 23, level: 5, categoria: 'bispo', label: 'Charles McGuire (2022)', grupo: 'bispo', ano: 2022 },
{ id: 24, level: 5, categoria: 'bispo', label: 'Fernando Altamira (2024)', grupo: 'bispo', ano: 2024 },
{ id: 25, level: 5, categoria: 'bispo', label: 'Pierre Roy', grupo: 'bispo', ano: 2024 },
{ id: 26, level: 5, categoria: 'bispo', label: 'Bede Nkamuke', grupo: 'bispo', ano: 2023 },
{ id: 27, level: 5, categoria: 'bispo', label: 'Merardo Loya', grupo: 'bispo', ano: 2025 }, // reconsagração sub conditione 2025 (1ª sagração 2019, ver comentário nas arestas)

{ id: 28, level: 5, categoria: 'bispo', label: 'Michael Mary, F.S.R.', grupo: 'bispo', ano: 2026 }, // reconsagração sub conditione 2025 (1ª sagração 2019, ver comentário nas arestas)




// NÍVEL 6: Padres

{ id: 29, level: 6, categoria: 'padre', label: 'Elmo (Francisco\nde Paula)', grupo: 'padre', ano: 1985 },
{ id: 30, level: 6, categoria: 'padre', label: 'Frei Tiago de\nSão José', grupo: 'padre', ano: 1995 },
{ id: 31, level: 6, categoria: 'padre', label: 'João Dorival', grupo: 'padre', ano: 1998 },
{ id: 32, level: 6, categoria: 'padre', label: 'Gilberto Ferreira', grupo: 'padre', ano: 2001 },
{ id: 33, level: 6, categoria: 'padre', label: 'Gabriel Spínola', grupo: 'padre' },
{ id: 34, level: 6, categoria: 'padre', label: 'Frei Pedro Maria', grupo: 'padre' },
{ id: 35, level: 6, categoria: 'padre', label: 'Marcelo Tenório', grupo: 'padre' },
{ id: 36, level: 6, categoria: 'padre', label: 'Dom Joaquim\n(Prior)', grupo: 'padre' },
{ id: 37, level: 6, categoria: 'padre', label: 'Dom Inácio', grupo: 'padre' },
{ id: 38, level: 6, categoria: 'padre', label: 'José Eduardo de\nOliveira', grupo: 'padre', ano: 2002 },
{ id: 39, level: 6, categoria: 'padre', label: 'Leonardo Holtz\nPeixoto (2022)', grupo: 'padre', ano: 2004 },
{ id: 40, level: 6, categoria: 'padre', label: 'Anselmo de Oliveira', grupo: 'padre', ano: 2008 },
{ id: 41, level: 6, categoria: 'padre', label: 'Angelo Mello de\nCarvalho', grupo: 'padre', ano: 2010 },
{ id: 42, level: 6, categoria: 'padre', label: 'Pedro Patrício', grupo: 'padre' },
{ id: 43, level: 6, categoria: 'padre', label: 'Leandro Neves', grupo: 'padre', ano: 2012 },
{ id: 44, level: 6, categoria: 'padre', label: 'Victor Rodrigues', grupo: 'padre', ano: 2015 },
{ id: 45, level: 6, categoria: 'padre', label: 'Carlos Zúñiga', grupo: 'padre', ano: 2017 },
{ id: 46, level: 6, categoria: 'padre', label: 'Mateus Pereira', grupo: 'padre', ano: 2018 },
{ id: 47, level: 6, categoria: 'padre', label: 'Pe. Jahir', grupo: 'padre' },
{ id: 48, level: 6, categoria: 'padre', label: 'Thiago Bonifácio', grupo: 'padre' },
{ id: 49, level: 6, categoria: 'padre', label: 'Lucas Prados', grupo: 'padre' },
{ id: 50, level: 6, categoria: 'padre', label: 'João Maria Vianney (2025)', grupo: 'padre', ano: 2025 },
{ id: 51, level: 6, categoria: 'padre', label: 'Pacífico Maria\n(anunciada 2026)', grupo: 'padre', ano: 2026 },
{ id: 52, level: 6, categoria: 'padre', label: 'Dimas Maria\n(anunciada 2026)', grupo: 'padre', ano: 2026 },
{ id: 88, level: 6, categoria: 'padre', label: 'Wagner Joseph', grupo: 'padre', ano: 2025 },





// NÍVEL 7: Classificações Teológicas

{ id: 53, level: 7, categoria: 'classificacao', label: 'Tradicionalismo\nUna Cum', grupo: 'classificacao' },
{ id: 54, level: 7, categoria: 'classificacao', label: 'Resistência\n(Una Cum)', grupo: 'classificacao' },
{ id: 55, level: 7, categoria: 'classificacao', label: 'Sedevacantismo\nTotalista', grupo: 'classificacao' },
{ id: 56, level: 7, categoria: 'classificacao', label: 'Sedeprivacionismo\n(Cassiciacum)', grupo: 'classificacao' },
{ id: 57, level: 7, categoria: 'classificacao', label: 'Independente /\nNão Una Cum Parcial', grupo: 'classificacao' },


// NÍVEL 8: Instituições e Seminários Independentes

{ id: 58, level: 8, categoria: 'instituicao', label: 'FSSPX', grupo: 'instituicao' },
{ id: 59, level: 8, categoria: 'instituicao', label: 'SAJM', grupo: 'instituicao' },
{ id: 60, level: 8, categoria: 'instituicao', label: 'Inst. Mater Boni\nConsilii', grupo: 'instituicao' },
{ id: 61, level: 8, categoria: 'instituicao', label: 'Most Holy Trinity\nSeminary', grupo: 'instituicao' },
{ id: 62, level: 8, categoria: 'instituicao', label: 'St. Gertrude\nthe Great', grupo: 'instituicao' },
{ id: 63, level: 8, categoria: 'instituicao', label: 'Mosteiro\nda Santa Cruz (1987)', grupo: 'instituicao' },
{ id: 64, level: 8, categoria: 'instituicao', label: 'Seminário São José', grupo: 'instituicao' },
{ id: 65, level: 8, categoria: 'instituicao', label: 'Missões Cristo Rei', grupo: 'instituicao' },
{ id: 66, level: 8, categoria: 'instituicao', label: 'Mosteiro Santo Elias', grupo: 'instituicao' },
{ id: 67, level: 8, categoria: 'instituicao', label: 'Capela São Vicente\nde Paulo', grupo: 'instituicao' },
{ id: 68, level: 8, categoria: 'instituicao', label: 'Capelania Santa\nMaria Madalena', grupo: 'instituicao' },
{ id: 69, level: 8, categoria: 'instituicao', label: 'Priorado\nSanta Teresinha', grupo: 'instituicao' },
{ id: 70, level: 8, categoria: 'instituicao', label: 'Capelania N. Sra do\nPerpétuo Socorro', grupo: 'instituicao' },
{ id: 71, level: 8, categoria: 'instituicao', label: 'Redentoristas Transalpinos (Escócia)', grupo: 'instituicao' },
{ id: 89, level: 8, categoria: 'instituicao', label: 'Missão Pindamonhangaba (SP)', grupo: 'instituicao' },


// NÍVEL 9: Localizações

// Escócia
{ id: 72, level: 9, categoria: 'localizacao', label: 'Estados Unidos', grupo: 'localizacao' },
{ id: 73, level: 9, categoria: 'localizacao', label: 'França', grupo: 'localizacao' },
{ id: 74, level: 9, categoria: 'localizacao', label: 'Itália', grupo: 'localizacao' },
{ id: 75, level: 9, categoria: 'localizacao', label: 'Argentina', grupo: 'localizacao' },
{ id: 76, level: 9, categoria: 'localizacao', label: 'Canadá', grupo: 'localizacao' },
{ id: 77, level: 9, categoria: 'localizacao', label: 'Nigéria', grupo: 'localizacao' },
{ id: 78, level: 9, categoria: 'localizacao', label: 'México', grupo: 'localizacao' },
{ id: 79, level: 9, categoria: 'localizacao', label: 'B. Horizonte /\nContagem (MG)', grupo: 'localizacao' },
{ id: 80, level: 9, categoria: 'localizacao', label: 'São Paulo (SP)', grupo: 'localizacao' },
{ id: 81, level: 9, categoria: 'localizacao', label: 'Rio de Janeiro (RJ)', grupo: 'localizacao' },
{ id: 82, level: 9, categoria: 'localizacao', label: 'Nova Friburgo (RJ)', grupo: 'localizacao' },
{ id: 83, level: 9, categoria: 'localizacao', label: 'Curitiba (PR)', grupo: 'localizacao' },
{ id: 84, level: 9, categoria: 'localizacao', label: 'Brasília (DF)', grupo: 'localizacao' },
{ id: 85, level: 9, categoria: 'localizacao', label: 'Goiás (GO)', grupo: 'localizacao' },
{ id: 86, level: 9, categoria: 'localizacao', label: 'Campo Grande (MS)', grupo: 'localizacao' },
{ id: 87, level: 9, categoria: 'localizacao', label: 'Sul do Brasil', grupo: 'localizacao' }
];

// ultimo numero utilizado 89






var todosSetas = [


    // -- SUCESSÃO APOSTÓLICA 
	
    { from: 1, to: 8, title: 'originou', texto: 'originou' },
    { from: 1, to: 9, title: 'originou', texto: 'originou' },
    { from: 1, to: 5, title: 'originou', texto: 'originou' },

    { from: 2, to: 4, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 3, to: 6, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 3, to: 7, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 7, to: 15, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 6, to: 14, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 6, to: 21, title: 'originou (linha Thuc)', texto: 'originou (linha Thuc)' },
    { from: 14, to: 20, title: 'consagrou bispo', texto: 'consagrou bispo' },

    { from: 4, to: 10, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 4, to: 11, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 4, to: 12, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 4, to: 13, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 5, to: 10, title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 5, to: 11, title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 5, to: 12, title: 'co-consagrou', texto: 'co-consagrou' },
    { from: 5, to: 13, title: 'co-consagrou', texto: 'co-consagrou' },

    { from: 12, to: 17, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 12, to: 18, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 12, to: 19, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 17, to: 18, title: 'co-consagrou', texto: 'co-consagrou' },

    { from: 4, to: 18, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 4, to: 16, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 4, to: 29, title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 20, to: 22, title: 'consagrou bispo 2021', texto: 'consagrou bispo 2021' },
    { from: 12, to: 22, title: 'ordenou padre 2017', texto: 'ordenou padre 2017' },

    { from: 8, to: 30, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 10, to: 31, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 10, to: 32, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 10, to: 38, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 10, to: 42, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 11, to: 43, title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 17, to: 44, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 17, to: 45, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 18, to: 40, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 18, to: 41, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 18, to: 46, title: 'ordenou padre', texto: 'ordenou padre' },

    { from: 9, to: 39, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 22, to: 39, title: 're-ordenou sub conditione', texto: 're-ordenou sub conditione' },

    { from: 22, to: 23, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 22, to: 24, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 22, to: 25, title: 'consagrou bispo', texto: 'consagrou bispo' },
    { from: 22, to: 26, title: 'consagrou bispo', texto: 'consagrou bispo' },

// Dom Merardo Loya --
	
    { from: 21, to: 27, title: 'consagrou bispo 2019', texto: 'consagrou bispo 2019' },
    { from: 22, to: 27, title: 're-consagrou sub cond. 2025', texto: 're-consagrou sub cond. 2025' },

// Pierre Roy, Rodrigo Da Silva e Fernando Altamira,

    { from: 22, to: 28, title: 'co-consagrou', texto: 'co-consagrou' },    
	{ from: 24, to: 28, title: 'co-consagrou', texto: 'co-consagrou' },     
	{ from: 25, to: 28, title: 'consagrou', texto: 'consagrou' },  
	{ from: 28, to: 71, title: 'pertence a', texto: 'pertence a' },

    { from: 22, to: 50, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 22, to: 51, title: 'ordenou padre', texto: 'ordenou padre' },
    { from: 22, to: 52, title: 'ordenou padre', texto: 'ordenou padre' },







// adota
    { from: 10, to: 53, title: 'adota', texto: 'adota' },
    { from: 11, to: 53, title: 'adota', texto: 'adota' },
    { from: 13, to: 53, title: 'adota', texto: 'adota' },
    { from: 14, to: 55, title: 'adota', texto: 'adota' },
    { from: 15, to: 56, title: 'adota', texto: 'adota' },
    { from: 16, to: 55, title: 'adota', texto: 'adota' },
    { from: 17, to: 54, title: 'adota', texto: 'adota' },
    { from: 18, to: 54, title: 'adota', texto: 'adota' },
    { from: 19, to: 54, title: 'adota', texto: 'adota' },
    { from: 22, to: 55, title: 'adota', texto: 'adota' },
    { from: 23, to: 55, title: 'adota', texto: 'adota' },
    { from: 24, to: 55, title: 'adota', texto: 'adota' },
    { from: 25, to: 55, title: 'adota', texto: 'adota' },
    { from: 26, to: 55, title: 'adota', texto: 'adota' },
    { from: 27, to: 55, title: 'adota', texto: 'adota' },
    { from: 29, to: 57, title: 'adota', texto: 'adota' },
    { from: 30, to: 55, title: 'adota', texto: 'adota' },
    { from: 31, to: 57, title: 'adota', texto: 'adota' },
    { from: 32, to: 55, title: 'adota', texto: 'adota' },
    { from: 33, to: 55, title: 'adota', texto: 'adota' },
    { from: 34, to: 55, title: 'adota', texto: 'adota' },
    { from: 35, to: 56, title: 'adota', texto: 'adota' },
    { from: 38, to: 57, title: 'adota', texto: 'adota' },
    { from: 39, to: 55, title: 'adota', texto: 'adota' },
    { from: 40, to: 55, title: 'adota', texto: 'adota' },
    { from: 41, to: 55, title: 'adota', texto: 'adota' },
    { from: 42, to: 53, title: 'adota', texto: 'adota' },
    { from: 43, to: 55, title: 'adota', texto: 'adota' },
    { from: 44, to: 55, title: 'adota', texto: 'adota' },
    { from: 45, to: 55, title: 'adota', texto: 'adota' },
    { from: 46, to: 55, title: 'adota', texto: 'adota' },
    { from: 47, to: 55, title: 'adota', texto: 'adota' },
    { from: 48, to: 57, title: 'adota', texto: 'adota' },
    { from: 49, to: 57, title: 'adota', texto: 'adota' },
    { from: 50, to: 55, title: 'adota', texto: 'adota' },
    { from: 51, to: 55, title: 'adota', texto: 'adota' },
    { from: 52, to: 55, title: 'adota', texto: 'adota' },
    { from: 58, to: 53, title: 'adota', texto: 'adota' },
    { from: 60, to: 56, title: 'adota', texto: 'adota' },
    { from: 88, to: 55, title: 'adota', texto: 'adota' },

    // adotou
    { from: 6, to: 55, title: 'adotou', texto: 'adotou', dashes: true },
    { from: 7, to: 56, title: 'adotou', texto: 'adotou', dashes: true },
    { from: 20, to: 55, title: 'adotou', texto: 'adotou', dashes: true },

    // adotou (2019-2025)
    { from: 27, to: 57, title: 'adotou (2019-2025)', texto: 'adotou (2019-2025)', dashes: true },

    // atua em
    { from: 14, to: 72, title: 'atua em', texto: 'atua em' },
    { from: 23, to: 72, title: 'atua em', texto: 'atua em' },
    { from: 24, to: 75, title: 'atua em', texto: 'atua em' },
    { from: 25, to: 76, title: 'atua em', texto: 'atua em' },
    { from: 26, to: 77, title: 'atua em', texto: 'atua em' },
    { from: 27, to: 78, title: 'atua em', texto: 'atua em' },
    { from: 32, to: 80, title: 'atua em', texto: 'atua em' },
    { from: 33, to: 79, title: 'atua em', texto: 'atua em' },
    { from: 34, to: 80, title: 'atua em', texto: 'atua em' },
    { from: 35, to: 86, title: 'atua em', texto: 'atua em' },
    { from: 39, to: 87, title: 'atua em', texto: 'atua em' },
    { from: 40, to: 84, title: 'atua em', texto: 'atua em' },
    { from: 40, to: 85, title: 'atua em', texto: 'atua em' },
    { from: 44, to: 81, title: 'atua em', texto: 'atua em' },
    { from: 46, to: 79, title: 'atua em', texto: 'atua em' },
    { from: 47, to: 87, title: 'atua em', texto: 'atua em' },

    // atuou em
    { from: 39, to: 65, title: 'atuou em', texto: 'atuou em', dashes: true },
    { from: 39, to: 81, title: 'atuou em', texto: 'atuou em', dashes: true },

    // auxilia
    { from: 31, to: 65, title: 'auxilia', texto: 'auxilia' },
    { from: 45, to: 65, title: 'auxilia', texto: 'auxilia' },

    // dialoga com
    { from: 35, to: 60, title: 'dialoga com', texto: 'dialoga com' },

    // foi membro de
    { from: 22, to: 61, title: 'foi membro de', texto: 'foi membro de', dashes: true },

    // fundamenta
    { from: 12, to: 54, title: 'fundamenta', texto: 'fundamenta' },

    // fundamentou
    { from: 4, to: 58, title: 'fundamentou', texto: 'fundamentou', dashes: true },

    // lidera
    { from: 15, to: 61, title: 'lidera', texto: 'lidera' },
    { from: 16, to: 65, title: 'lidera', texto: 'lidera' },
    { from: 17, to: 59, title: 'lidera', texto: 'lidera' },
    { from: 18, to: 63, title: 'lidera', texto: 'lidera' },
    { from: 22, to: 64, title: 'lidera', texto: 'lidera' },
    { from: 23, to: 62, title: 'lidera', texto: 'lidera' },
    { from: 88, to: 89, title: 'lidera', texto: 'lidera' },

    // liderou
    { from: 20, to: 62, title: 'liderou', texto: 'liderou', dashes: true },

    // localizado em
    { from: 59, to: 73, title: 'localizado em', texto: 'localizado em' },
    { from: 60, to: 74, title: 'localizado em', texto: 'localizado em' },
    { from: 61, to: 72, title: 'localizado em', texto: 'localizado em' },
    { from: 62, to: 72, title: 'localizado em', texto: 'localizado em' },
    { from: 63, to: 82, title: 'localizado em', texto: 'localizado em' },
    { from: 65, to: 79, title: 'localizado em', texto: 'localizado em' },
    { from: 66, to: 73, title: 'localizado em', texto: 'localizado em' },
    { from: 67, to: 79, title: 'localizado em', texto: 'localizado em' },
    { from: 68, to: 83, title: 'localizado em', texto: 'localizado em' },
    { from: 64, to: 80, title: 'localizado em', texto: 'localizado em' },
    { from: 69, to: 80, title: 'localizado em', texto: 'localizado em' },
    { from: 70, to: 80, title: 'localizado em', texto: 'localizado em' },
    { from: 89, to: 80, title: 'localizado em', texto: 'localizado em' },

    // mantém
    { from: 58, to: 69, title: 'mantém', texto: 'mantém' },
    { from: 58, to: 70, title: 'mantém', texto: 'mantém' },

    // pertence a
    { from: 10, to: 58, title: 'pertence a', texto: 'pertence a' },
    { from: 11, to: 58, title: 'pertence a', texto: 'pertence a' },
    { from: 13, to: 58, title: 'pertence a', texto: 'pertence a' },
    { from: 30, to: 66, title: 'pertence a', texto: 'pertence a' },
    { from: 32, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 32, to: 67, title: 'pertence a', texto: 'pertence a' },
    { from: 33, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 34, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 36, to: 63, title: 'pertence a', texto: 'pertence a' },
    { from: 37, to: 63, title: 'pertence a', texto: 'pertence a' },
    { from: 38, to: 68, title: 'pertence a', texto: 'pertence a' },
    { from: 39, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 40, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 41, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 42, to: 58, title: 'pertence a', texto: 'pertence a' },
    { from: 44, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 46, to: 65, title: 'pertence a', texto: 'pertence a' },
    { from: 50, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 51, to: 64, title: 'pertence a', texto: 'pertence a' },
    { from: 52, to: 64, title: 'pertence a', texto: 'pertence a' },

    // rompeu com
    { from: 16, to: 54, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 16, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 22, to: 54, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 29, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 31, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 32, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 38, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 43, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 44, to: 54, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 48, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 49, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },
    { from: 54, to: 58, title: 'rompeu com', texto: 'rompeu com', dashes: true },

    // visitou
    { from: 29, to: 79, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 29, to: 80, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 32, to: 85, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 41, to: 80, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 41, to: 81, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 42, to: 79, title: 'visitou', texto: 'visitou', dashes: true },
    { from: 42, to: 81, title: 'visitou', texto: 'visitou', dashes: true }	
	
];
module.exports = { todosNos, todosSetas, regras: regrasDoGrafo };
