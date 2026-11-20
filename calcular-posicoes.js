// ============================================================
// calcular-posicoes.js
// ============================================================
//
// ÁRVORE DE DECISÃO — CAMADAS DE GENERALIDADE (não remover nem mover):
//
// GITHUB (este arquivo + dados-grafo.js de cada pasta + workflow)
//   = GERAL. Gerencia N grafos ao mesmo tempo. Só pode usar o que
//     está exposto no dicionário/layout de cada dados-grafo.js —
//     nunca suposição fixa de 1 grafo específico.
//
// MOTOR (MOTOR_grafo_v10, 1 instância só, compartilhada por todos
//   os posts do blog)
//   = TAMBÉM GERAL, mas roda em runtime, sob restrição de
//     performance do navegador, e recalcula só SUBCONJUNTOS
//     filtrados. Pode ter comportamento simplificado/aproximado em
//     relação a este arquivo, SEM que isso seja inconsistência —
//     desde que a diferença não venha de codar algo fixo de 1
//     grafo específico (isso sim seria violação).
//
// PÁGINA (1 bloco de post por grafo, ex: grafo_santos_v10.txt)
//   = O ÚNICO lugar que pode ser particular de fato: id do
//     container, botões de filtro, qual JSON carregar. Tudo
//     específico de 1 grafo mora aqui — nunca no motor, nunca
//     aqui neste arquivo.
//
//Nova regra genérica de layout: quebrarSempreEntreCategorias (default true). //Presente em REGRAS_PADRAO (build) e no fallback do motor. Pode ser desativada por //grafo, em regrasDoGrafo.layout, se algum grafo específico preferir o //comportamento antigo (categorias pequenas podem ficar juntas na mesma fileira).
//Resolve a centrifugação: categoria "ideia" com 1 nó (ex: filtro mártir) agora //sempre quebra fileira antes de "documento" entrar, independente do tamanho.
// ============================================================






const fs = require('fs');
const path = require('path');

const PASTA_GRAFOS = __dirname;
const PASTAS_IGNORADAS = ['.github', '.git', 'node_modules'];

// -------- Números que ficam FIXOS pra todo grafo (não fazem parte do dicionário) --------
const ESPACAMENTO_NO_BASE = 150;
const ESPACAMENTO_POR_CARACTERE = 14;
const TAMANHO_MINIMO_LABEL = 3;
const TAMANHO_MAXIMO_LABEL = 40;
const NUM_PASSADAS = 6;
// -------------------------------------------------------------------------

// Usado se dados-grafo.js não tiver a chave "regras" — mantém o
// comportamento de antes, sem quebrar grafos ainda não migrados.
const REGRAS_PADRAO = {
  dicionario: { chaveOrdenacao: 'ano', agrupamento: 'categoria', mesReferencia: 'mesNumero', campoDetalhe: null, prefixoDetalhe: '' },
  layout: { nosPorFileira: 16, minimoAntesQuebraSeculo: 16, alturaPorFileira: 150, numLinhasInternas: 2, usaQuebraPorEpoca: true, quebrarSempreEntreCategorias: true },
  cores: {}
};

function mesclarComPadrao(regrasCarregadas) {
  regrasCarregadas = regrasCarregadas || {};
  var resultado = {
    dicionario: Object.assign({}, REGRAS_PADRAO.dicionario, regrasCarregadas.dicionario),
    layout: Object.assign({}, REGRAS_PADRAO.layout, regrasCarregadas.layout),
    cores: Object.assign({}, REGRAS_PADRAO.cores, regrasCarregadas.cores)
  };
  if (regrasCarregadas.mapa) {
    resultado.mapa = regrasCarregadas.mapa;
  }
  return resultado;
}

function extrairDiaDoTexto(texto) {
  if (!texto) return null;
  var m = String(texto).match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

function calcularSeculo(valor) {
  if (valor === undefined || valor === null) return null;
  return Math.floor((valor - 1) / 100) + 1;
}

// Pra cada nó, calcula a "chave de ordenação" (o campo do dicionário,
// refinado por mês+dia quando existir). Nó sem esse campo fica de fora
// do mapa -> cai só no baricentro, sem mudar de nível.
function calcularDataChavePorNo(todosNos, todosSetas, regras) {
  var mapaNo = {};
  todosNos.forEach(function(n) { mapaNo[n.id] = n; });

  var campoChave = regras.dicionario.chaveOrdenacao;
  var campoMes = regras.dicionario.mesReferencia;

  var mesDiaPorNo = {};
  todosSetas.forEach(function(s) {
    var noOrigem = mapaNo[s.from];
    if (!noOrigem || noOrigem[campoMes] === undefined || noOrigem[campoMes] === null) return;
    var dia = extrairDiaDoTexto(s.texto);
    if (dia === null) return;
    var chaveMD = noOrigem[campoMes] * 100 + dia;
    var atual = mesDiaPorNo[s.to];
    if (atual === undefined || chaveMD < atual) mesDiaPorNo[s.to] = chaveMD;
  });

  var dataChavePorNo = {};
  todosNos.forEach(function(n) {
    var valorChave = n[campoChave];
    if (valorChave === undefined || valorChave === null) return;
    var md = mesDiaPorNo[n.id];
    dataChavePorNo[n.id] = (md !== undefined) ? (valorChave * 10000 + md) : (valorChave * 10000);
  });
  return dataChavePorNo;
}

// Agrupa os nós de UM nível em fileiras: separa pelo campo de agrupamento
// do dicionário, ordena por data-chave, e quebra por (nosPorFileira) OU
// (troca de época, só depois de já ter o mínimo definido em layout).
// a variável minimoEpoca é a mesma variável já existente — não criei campo novo. Ela 
// agora serve dois papéis: quebra por época E limiar de fechamento entre grupos

function construirFileirasDoNivel(nosDoNivel, dataChavePorNo, regras) {
  var campoAgrupamento = regras.dicionario.agrupamento;
  var nosPorFileira = regras.layout.nosPorFileira;
  var usaEpoca = regras.layout.usaQuebraPorEpoca;
  var minimoEpoca = regras.layout.minimoAntesQuebraSeculo;
  var quebrarSempreEntreCategorias = regras.layout.quebrarSempreEntreCategorias;
  var campoChave = regras.dicionario.chaveOrdenacao;

  var ordemCategorias = [];
  var gruposPorCategoria = {};

  nosDoNivel.forEach(function(n) {
    var valorCat = campoAgrupamento ? n[campoAgrupamento] : undefined;
    var chave = (valorCat !== undefined && valorCat !== null) ? String(valorCat) : '__sem_categoria__';
    if (!gruposPorCategoria[chave]) {
      gruposPorCategoria[chave] = [];
      ordemCategorias.push(chave);
    }
    gruposPorCategoria[chave].push(n);
  });


var fileiras = [];
  var fileiraAtual = [];
  var epocaAtual = null;
  ordemCategorias.forEach(function(chave) {
    var nosDaCategoria = gruposPorCategoria[chave];
    nosDaCategoria.sort(function(a, b) {
      var da = dataChavePorNo[a.id];
      var db = dataChavePorNo[b.id];
      // Nó sem data-chave vai sempre pro fim do grupo (ordem estável,
      // não mais "empate" indevido entre indefinidos e valores reais).
      if (da === undefined && db === undefined) return 0;
      if (da === undefined) return 1;
      if (db === undefined) return -1;
      return da - db;
    });
    // Regra B (revisada): por padrão, SEMPRE quebra fileira ao trocar de
    // categoria (quebrarSempreEntreCategorias: true) — evita categorias
    // pequenas (ex: 1 nó filtrado) ficarem misturadas com a próxima.
    // Se quebrarSempreEntreCategorias for false, volta ao comportamento
    // antigo: só quebra se a fileira já tiver alcançado o limiar (minimoEpoca).
    if (fileiraAtual.length > 0 && (quebrarSempreEntreCategorias || fileiraAtual.length >= minimoEpoca)) {
      fileiras.push(fileiraAtual);
      fileiraAtual = [];
      epocaAtual = null;
    }
    nosDaCategoria.forEach(function(n) {
      var epoca = usaEpoca ? calcularSeculo(n[campoChave]) : null;
      var mudouEpoca = (epocaAtual !== null && epoca !== null && epoca !== epocaAtual);
      var podeQuebrarPorEpoca = usaEpoca && mudouEpoca && fileiraAtual.length >= minimoEpoca;
      if (fileiraAtual.length > 0 && (fileiraAtual.length >= nosPorFileira || podeQuebrarPorEpoca)) {
        fileiras.push(fileiraAtual);
        fileiraAtual = [];
        epocaAtual = null;
      }
      fileiraAtual.push(n);
      if (epoca !== null) epocaAtual = epoca;
    });
  });
  if (fileiraAtual.length > 0) fileiras.push(fileiraAtual);
  return fileiras;
}

function calcularPosicoesDeUmGrafo(todosNos, todosSetas, regrasCarregadas) {
  var regras = mesclarComPadrao(regrasCarregadas);
  var ALTURA_POR_FILEIRA = regras.layout.alturaPorFileira;
  var NUM_LINHAS_INTERNAS = regras.layout.numLinhasInternas;

  var nosPorNivel = {};
  todosNos.forEach(function(n) {
    if (!nosPorNivel[n.level]) nosPorNivel[n.level] = [];
    nosPorNivel[n.level].push(n);
  });
  var listaNiveis = Object.keys(nosPorNivel).map(Number).sort(function(a, b) { return a - b; });

  var dataChavePorNo = calcularDataChavePorNo(todosNos, todosSetas, regras);

  var fileirasPorNivel = {};
  var alturaTotalPorNivel = {};
  listaNiveis.forEach(function(lvl) {
    var fileiras = construirFileirasDoNivel(nosPorNivel[lvl], dataChavePorNo, regras);
    fileirasPorNivel[lvl] = fileiras;
    alturaTotalPorNivel[lvl] = fileiras.length * ALTURA_POR_FILEIRA;
  });

  var yBasePorNivel = {};
  var acumulado = 0;
  listaNiveis.forEach(function(lvl) {
    yBasePorNivel[lvl] = acumulado;
    acumulado += alturaTotalPorNivel[lvl];
  });

  var niveis = {};
  var yFinalPorNo = {};
  var linhaVisualIndex = 0;

  listaNiveis.forEach(function(lvl) {
    fileirasPorNivel[lvl].forEach(function(nosDaFileira) {
      var idsDaFileira = nosDaFileira.map(function(n) { return n.id; });
      niveis[linhaVisualIndex] = idsDaFileira;
      linhaVisualIndex++;
    });
  });

  var listaLinhasVisuais = Object.keys(niveis).map(Number).sort(function(a, b) { return a - b; });

  var vizinhos = {};
  todosNos.forEach(function(n) { vizinhos[n.id] = []; });
  todosSetas.forEach(function(e) {
    if (vizinhos[e.from]) vizinhos[e.from].push(e.to);
    if (vizinhos[e.to]) vizinhos[e.to].push(e.from);
  });

  var posX = {};
  listaLinhasVisuais.forEach(function(lvl) {
    niveis[lvl].forEach(function(id, idx) { posX[id] = idx; });
  });

  function ordenarNivelPorBaricentro(lvl) {
    var idsDoNivel = niveis[lvl];
    var comMedia = idsDoNivel.map(function(id) {
      var vizinhosConectados = vizinhos[id];
      if (vizinhosConectados.length === 0) {
        return { id: id, media: posX[id] };
      }
      var soma = 0, qtd = 0;
      vizinhosConectados.forEach(function(vId) {
        if (posX[vId] !== undefined) { soma += posX[vId]; qtd++; }
      });
      return { id: id, media: qtd > 0 ? (soma / qtd) : posX[id] };
    });
    comMedia.sort(function(a, b) {
      var da = dataChavePorNo[a.id];
      var db = dataChavePorNo[b.id];
      if (da !== undefined && db !== undefined) {
        if (da !== db) return da - db;
        return a.media - b.media;
      }
      // Nó sem data-chave vai sempre pro fim (desempate estável por
      // baricentro só entre os que também não têm data).
      if (da === undefined && db === undefined) return a.media - b.media;
      if (da === undefined) return 1;
      return -1;
    });
    niveis[lvl] = comMedia.map(function(o) { return o.id; });
    niveis[lvl].forEach(function(id, idx) { posX[id] = idx; });
  }

  var NUM_PASSADAS_LOCAL = NUM_PASSADAS;
  for (var passada = 0; passada < NUM_PASSADAS_LOCAL; passada++) {
    for (var i = 0; i < listaLinhasVisuais.length; i++) ordenarNivelPorBaricentro(listaLinhasVisuais[i]);
    for (var j = listaLinhasVisuais.length - 1; j >= 0; j--) ordenarNivelPorBaricentro(listaLinhasVisuais[j]);
  }

  // (bloco de código morto removido — cálculo duplicado sem uso.
  // O cálculo real de zig-zag acontece logo abaixo, usando
  // "infoLinhaVisual" pra achar o Y base corretamente.)

  // Mapeia cada linha visual -> nível + índice de fileira dentro do nível,
  // pra poder somar o Y base certo no passo do zig-zag.
  var infoLinhaVisual = {}; // idxLinha -> { lvl, indiceFileiraDentroDoNivel }
  var contador = 0;
  listaNiveis.forEach(function(lvl) {
    fileirasPorNivel[lvl].forEach(function(fileira, indiceFileiraDentroDoNivel) {
      infoLinhaVisual[contador] = { lvl: lvl, indiceFileiraDentroDoNivel: indiceFileiraDentroDoNivel };
      contador++;
    });
  });

  listaLinhasVisuais.forEach(function(idxLinha) {
    var idsOrdenados = niveis[idxLinha];
    var info = infoLinhaVisual[idxLinha];
    idsOrdenados.forEach(function(id, posicaoFinalNaTela) {
      var subLinha = posicaoFinalNaTela % NUM_LINHAS_INTERNAS;
      var alturaFatia = ALTURA_POR_FILEIRA / NUM_LINHAS_INTERNAS;
      var yDentroDaFileira = (subLinha + 0.5) * alturaFatia;
      yFinalPorNo[id] = yBasePorNivel[info.lvl]
        + info.indiceFileiraDentroDoNivel * ALTURA_POR_FILEIRA
        + yDentroDaFileira;
    });
  });

  var mapaNoPorId = {};
  todosNos.forEach(function(n) { mapaNoPorId[n.id] = n; });

  // Faixas de século — mesma lógica do motor (runtime), calculada aqui
  // pra grafos abertos sem filtro ('TODOS'), que não passam pelo
  // recálculo de posições em tempo real.
  var bandasEpoca = [];
  if (regras.layout.usaQuebraPorEpoca) {
    var niveisComSeculoCfg = regras.layout.niveisComSeculo || null;
    var niveisComSeculoSet = null;
    if (niveisComSeculoCfg) {
      niveisComSeculoSet = {};
      niveisComSeculoCfg.forEach(function(lvl) { niveisComSeculoSet[lvl] = true; });
    }
    var seculoAtualBandaBuild = null;
    var yInicioBandaBuild = null;
    var yFimUltimaLinhaValida = null;
    listaLinhasVisuais.forEach(function(idxLinha) {
      var idsDaLinha = niveis[idxLinha];
      var info = infoLinhaVisual[idxLinha];
      // Pula níveis fora do conjunto configurado (ex: nível 2 tem 'ano'
      // mas não deve gerar faixa de século — só serve pra ordenação).
      if (niveisComSeculoSet && !niveisComSeculoSet[info.lvl]) return;
      var yTopoLinha = yBasePorNivel[info.lvl] + info.indiceFileiraDentroDoNivel * ALTURA_POR_FILEIRA;
      yFimUltimaLinhaValida = yTopoLinha + ALTURA_POR_FILEIRA;
      var seculoDaLinha = null;
      for (var k = 0; k < idsDaLinha.length; k++) {
        var noRef = mapaNoPorId[idsDaLinha[k]];
        var valorChaveRef = noRef ? noRef[regras.dicionario.chaveOrdenacao] : undefined;
        if (valorChaveRef !== undefined && valorChaveRef !== null) {
          seculoDaLinha = calcularSeculo(valorChaveRef);
          break;
        }
      }
      if (seculoDaLinha !== seculoAtualBandaBuild) {
        if (seculoAtualBandaBuild !== null) {
          bandasEpoca.push({ seculo: seculoAtualBandaBuild, yInicio: yInicioBandaBuild, yFim: yTopoLinha });
        }
        seculoAtualBandaBuild = seculoDaLinha;
        yInicioBandaBuild = yTopoLinha;
      }
    });
    if (seculoAtualBandaBuild !== null) {
      // Fecha rigorosamente no final do último nível com século (Nível 6), sem invadir congregações ou locais
      var yFimFinal = yFimUltimaLinhaValida || (yInicioBandaBuild + ALTURA_POR_FILEIRA);
      bandasEpoca.push({ seculo: seculoAtualBandaBuild, yInicio: yInicioBandaBuild, yFim: yFimFinal });
    }
  }

  // Bandas de nível: linha divisória + nome (regras.layout.rotulosNiveis).
  // Dois mecanismos opcionais de destaque, aplicáveis a QUALQUER nível:
  // - regras.layout.subgruposPorNivel[nivel] = { rotulos: {...}, cores: {...} }
  //   -> subdivide o nível em blocos por categoria, cada um com seu
  //      rótulo/cor. Sem essa chave para o nível, nenhum subgrupo.
  // - regras.layout.coresNiveis[nivel] = 'rgba(...)'
  //   -> pinta o nível INTEIRO com uma cor sólida, sem subdividir por
  //      categoria. Usado quando subgruposPorNivel não define o nível.
  // Ambos aditivos: nível sem nenhuma das duas chaves só recebe o
  // rótulo de texto (ou nada, se rotulosNiveis também não o definir).
  
  var bandasNiveis = [];
  var rotulosNiveisCfg = regras.layout.rotulosNiveis || {};
  var coresNiveisCfg = regras.layout.coresNiveis || {};
  var subgruposPorNivelCfg = regras.layout.subgruposPorNivel || {};

  listaNiveis.forEach(function(lvl) {
    var fileirasDoNivel = fileirasPorNivel[lvl];
    if (!fileirasDoNivel || fileirasDoNivel.length === 0) return;
    var yTopoNivel = yBasePorNivel[lvl];
    var yFimNivel = yBasePorNivel[lvl] + alturaTotalPorNivel[lvl];

    var subgrupoDesteNivel = subgruposPorNivelCfg[lvl] || null;
    var rotulosSubCfg = subgrupoDesteNivel ? (subgrupoDesteNivel.rotulos || {}) : {};
    var coresSubCfg = subgrupoDesteNivel ? (subgrupoDesteNivel.cores || {}) : {};
    var temSubgrupo = Object.keys(rotulosSubCfg).length > 0 || Object.keys(coresSubCfg).length > 0;

    if (temSubgrupo) {
      var categoriaAtualSub = null;
      var yInicioSub = null;
      fileirasDoNivel.forEach(function(fileira, idxFileira) {
        var yTopoFileira = yBasePorNivel[lvl] + idxFileira * ALTURA_POR_FILEIRA;
        var categoriaDaFileira = fileira.length > 0 ? fileira[0].categoria : null;
        if (categoriaDaFileira !== categoriaAtualSub) {
          if (categoriaAtualSub !== null) {
            bandasNiveis.push({
              yInicio: yInicioSub,
              yFim: yTopoFileira,
              label: rotulosSubCfg[categoriaAtualSub] || null,
              cor: coresSubCfg[categoriaAtualSub] || null
            });
          }
          categoriaAtualSub = categoriaDaFileira;
          yInicioSub = yTopoFileira;
        }
      });
      if (categoriaAtualSub !== null) {
        bandasNiveis.push({
          yInicio: yInicioSub,
          yFim: yFimNivel,
          label: rotulosSubCfg[categoriaAtualSub] || null,
          cor: coresSubCfg[categoriaAtualSub] || null
        });
      }
    } else {
      bandasNiveis.push({
        yInicio: yTopoNivel,
        yFim: yFimNivel,
        label: rotulosNiveisCfg[lvl] || null,
        cor: coresNiveisCfg[lvl] || null
      });
    }
  });

  function calcularLarguraNo(id) {
    var no = mapaNoPorId[id];
    var textoBase = (no && no.label !== undefined && no.label !== null)
      ? String(no.label).trim()
      : '';
    if (textoBase.length === 0) textoBase = String(id).trim();
    var comprimento = textoBase.length;
    if (comprimento < TAMANHO_MINIMO_LABEL) comprimento = TAMANHO_MINIMO_LABEL;
    if (comprimento > TAMANHO_MAXIMO_LABEL) comprimento = TAMANHO_MAXIMO_LABEL;
    return ESPACAMENTO_NO_BASE + comprimento * ESPACAMENTO_POR_CARACTERE;
  }

  var xPorNo = {};
  listaLinhasVisuais.forEach(function(lvl) {
    var idsOrdenados = niveis[lvl];
    var larguras = idsOrdenados.map(calcularLarguraNo);
    var larguraTotal = larguras.reduce(function(a, b) { return a + b; }, 0);
    var acumuladoX = 0;
    idsOrdenados.forEach(function(id, idx) {
      var w = larguras[idx];
      var centro = acumuladoX + w / 2;
      xPorNo[id] = centro - larguraTotal / 2;
      acumuladoX += w;
    });
  });

  return {
    nodes: todosNos.map(function(n) {
      return Object.assign({}, n, { x: xPorNo[n.id], y: yFinalPorNo[n.id] });
    }),
    bandasEpoca: bandasEpoca,
    bandasNiveis: bandasNiveis
  };
}

function encontrarPastasDeGrafo() {
  return fs.readdirSync(PASTA_GRAFOS, { withFileTypes: true })
    .filter(function(item) { return item.isDirectory(); })
    .map(function(item) { return item.name; })
    .filter(function(nome) { return PASTAS_IGNORADAS.indexOf(nome) === -1; });
}

function limparNomeCidadeMapa(label, nomePais) {
  var texto = String(label || '').trim();
  if (!nomePais) return texto;
  var sufixo = ' (' + nomePais + ')';
  if (texto.endsWith(sufixo)) {
    return texto.slice(0, -sufixo.length).trim();
  }
  return texto;
}

var NOMES_MESES_MAPA = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

var MAPA_MES_POR_NOME = {
  janeiro: 1, fevereiro: 2, marco: 3, abril: 4, maio: 5, junho: 6,
  julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12
};

function normalizarSemAcentoMaiuscula(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalizarTituloLiturgico(texto) {
  var limpo = String(texto || '').trim();
  if (!limpo) return '';
  return limpo.charAt(0).toUpperCase() + limpo.slice(1).toLowerCase();
}

function sanitizarCampoRelatorio(texto) {
  var s = String(texto === undefined || texto === null ? '' : texto)
    .replace(/[\r\n|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s === '' ? '-' : s;
}

function formatarDataHoraAtual() {
  var d = new Date();
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

function gravarRelatorioAcumulativo(caminhoRelatorio, ocorrencias) {
  if (!caminhoRelatorio || !ocorrencias || ocorrencias.length === 0) return 0;

  var cabecalho = 'data/hora | tipo | santo | campo | valor_grafo | valor_ficou';
  var chavesExistentes = new Set();
  var conteudoExistente = '';

  if (fs.existsSync(caminhoRelatorio)) {
    conteudoExistente = fs.readFileSync(caminhoRelatorio, 'utf8');
    conteudoExistente.split(/\r?\n/).forEach(function(linha) {
      var l = linha.trim();
      if (!l || l.indexOf('data/hora |') === 0) return;
      var partes = l.split(' | ');
      if (partes.length >= 6) {
        chavesExistentes.add(partes.slice(1, 6).join(' | '));
      }
    });
  }

  var agora = formatarDataHoraAtual();
  var novasLinhas = [];

  ocorrencias.forEach(function(oc) {
    var chave = [
      sanitizarCampoRelatorio(oc.tipo),
      sanitizarCampoRelatorio(oc.santo),
      sanitizarCampoRelatorio(oc.campo),
      sanitizarCampoRelatorio(oc.valorGrafo),
      sanitizarCampoRelatorio(oc.valorFicou)
    ].join(' | ');
    if (!chavesExistentes.has(chave)) {
      chavesExistentes.add(chave);
      novasLinhas.push(agora + ' | ' + chave);
    }
  });

  if (novasLinhas.length === 0) return 0;

  if (!fs.existsSync(caminhoRelatorio) || conteudoExistente.trim() === '') {
    fs.writeFileSync(caminhoRelatorio, cabecalho + '\n' + novasLinhas.join('\n') + '\n', 'utf8');
  } else {
    var prefixo = conteudoExistente.endsWith('\n') ? '' : '\n';
    fs.appendFileSync(caminhoRelatorio, prefixo + novasLinhas.join('\n') + '\n', 'utf8');
  }
  return novasLinhas.length;
}

function extrairDiaMesDeTexto(texto) {
  var limpo = String(texto || '').trim();
  if (!limpo) return null;
  var m = limpo.match(/\b(\d{1,2})\s+de\s+([a-zA-ZÀ-ÿ]+)/i);
  if (!m) return null;
  var dia = parseInt(m[1], 10);
  if (isNaN(dia) || dia < 1 || dia > 31) return null;
  var mesNorm = normalizarSemAcentoMaiuscula(m[2]).toLowerCase();
  var mesNum = MAPA_MES_POR_NOME[mesNorm];
  if (!mesNum) return null;
  return {
    dia: dia,
    mesNum: mesNum,
    diaMesStr: dia + ' de ' + NOMES_MESES_MAPA[mesNum - 1]
  };
}

function ehNumeroCoordValido(v) {
  if (v === undefined || v === null || v === '') return false;
  var n = Number(v);
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}

function normalizarTokensNomeSanto(nome) {
  var limpo = normalizarSemAcentoMaiuscula(nome)
    .replace(/[.,\/\-()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!limpo) return [];
  var ignoraPreposicoes = { DE: true, DA: true, DO: true, DAS: true, DOS: true };
  var prefixosSanto = { S: true, SAO: true, STO: true, SANTO: true, STA: true, SANTA: true };
  return limpo.split(' ').reduce(function(acc, tok) {
    if (!tok || ignoraPreposicoes[tok]) return acc;
    if (prefixosSanto[tok]) {
      acc.push('SANTO');
    } else {
      acc.push(tok);
    }
    return acc;
  }, []);
}

function normalizarChaveNomeSanto(nome) {
  return normalizarTokensNomeSanto(nome).join(' ');
}

function extrairRomanos(tokens) {
  var reRomano = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)$/;
  return tokens.filter(function(t) { return reRomano.test(t); });
}

function nomesSaoProvavelDuplicata(nomeA, nomeB) {
  var tokA = normalizarTokensNomeSanto(nomeA);
  var tokB = normalizarTokensNomeSanto(nomeB);
  if (tokA.length === 0 || tokB.length === 0) return false;
  if (tokA.join(' ') === tokB.join(' ')) return false;

  var romA = extrairRomanos(tokA);
  var romB = extrairRomanos(tokB);
  if (romA.length > 0 && romB.length > 0 && romA.join(',') !== romB.join(',')) {
    return false;
  }

  var sigA = tokA.filter(function(t) { return t !== 'SANTO'; });
  var sigB = tokB.filter(function(t) { return t !== 'SANTO'; });
  if (sigA.length === 0 || sigB.length === 0) return false;
  if (Math.min(sigA.length, sigB.length) < 2) return false;

  var setA = new Set(sigA);
  var setB = new Set(sigB);
  var contemATodoB = sigB.every(function(t) { return setA.has(t); });
  var contemBTodoA = sigA.every(function(t) { return setB.has(t); });
  if (contemATodoB || contemBTodoA) return true;

  var comuns = 0;
  setA.forEach(function(t) { if (setB.has(t)) comuns++; });
  var maxLen = Math.max(sigA.length, sigB.length);
  return (comuns / maxLen) >= 0.75;
}

function gerarDadosDoMapa(todosNos, todosSetas, regrasCarregadas, nomeGrafo, pastaAtual) {
  var cfg = regrasCarregadas.mapa;
  var campos = cfg.campos || {};
  var campoLocalNasc = campos.localNasc || 'localNasc';
  var campoPaisNasc = campos.paisNasc || 'paisNasc';
  var campoPais = campos.pais || 'pais';
  var campoIso = campos.iso || 'iso';
  var campoLat = campos.lat || 'lat';
  var campoLng = campos.lng || 'lng';
  var campoAno = campos.ano || 'ano';
  var campoDataMorte = campos.dataMorte || 'dataMorte';
  var campoIgnorarMapa = campos.ignorarMapa || 'ignorarMapa';
  var campoMesNumero = campos.mesNumero ||
    (regrasCarregadas.dicionario && regrasCarregadas.dicionario.mesReferencia) ||
    'mesNumero';

  var nivelTitulos = (cfg.nivelTitulos !== undefined) ? cfg.nivelTitulos : 1;
  var categoriaTitulo = cfg.categoriaTitulo || 'ideia';
  var titulosIgnoradosSet = new Set((cfg.titulosIgnorados || ['FESTA']).map(normalizarSemAcentoMaiuscula));
  var festasIgnoradasLista = (cfg.festasIgnoradas || ['CATEDRA', 'CONVERSAO']).map(normalizarSemAcentoMaiuscula);

  var niveisSet = new Set(cfg.niveisSantos || []);
  var excluidosSet = new Set((cfg.idsExcluidos || []).map(String));
  var mapaPaisesCfg = cfg.paises || {};

  var ocorrenciasRelatorio = [];
  function registrarOcorrencia(tipo, santo, campo, valorGrafo, valorFicou) {
    ocorrenciasRelatorio.push({
      tipo: tipo,
      santo: santo,
      campo: campo,
      valorGrafo: valorGrafo,
      valorFicou: valorFicou
    });
  }

  var nosPorId = {};
  (todosNos || []).forEach(function(n) { nosPorId[String(n.id)] = n; });

  var setasPorTo = {};
  (todosSetas || []).forEach(function(s) {
    var para = String(s.to);
    if (!setasPorTo[para]) setasPorTo[para] = [];
    setasPorTo[para].push(s);
  });

  var qtdExcluidosAplicados = 0;
  var comConflito = [];
  var locaisSemCoord = new Set();
  var locaisInexistentes = new Set();
  var isosSemTabela = new Set();

  // 1) Extrair santos do grafo
  var santosGrafo = [];
  var grafoPorId = {};
  var grafoPorNomeNorm = {};

  (todosNos || []).forEach(function(n) {
    if (!niveisSet.has(n.level)) return;
    var idStr = String(n.id);
    if (excluidosSet.has(idStr) || n[campoIgnorarMapa] === true) {
      qtdExcluidosAplicados++;
      return;
    }

    var nomeSanto = String(n.label || '').trim();
    var rotuloRel = idStr + ' - ' + nomeSanto;

    var titulos = [];
    var titulosVistos = new Set();
    var festasCandidatas = [];
    var arestasParaSanto = setasPorTo[idStr] || [];

    arestasParaSanto.forEach(function(s) {
      if (s[campoIgnorarMapa] === true) return;
      var noOrigem = nosPorId[String(s.from)];
      if (!noOrigem) return;

      var mesVal = noOrigem[campoMesNumero];
      var ehMes = (mesVal !== undefined && mesVal !== null && !isNaN(Number(mesVal)));

      if (ehMes) {
        var mesNum = parseInt(mesVal, 10);
        if (mesNum < 1 || mesNum > 12) return;
        var textoEdge = String(s.texto || '').trim();
        var textoNorm = normalizarSemAcentoMaiuscula(textoEdge);

        var ehFestaIgnorada = festasIgnoradasLista.some(function(palavra) {
          return textoNorm.indexOf(palavra) !== -1;
        });
        if (ehFestaIgnorada) {
          registrarOcorrencia('festa ignorada', rotuloRel, 'diaFesta', textoEdge, '(ignorado: Cátedra/Conversão)');
          return;
        }

        var dia = extrairDiaDoTexto(textoEdge);
        if (dia === null || dia < 1 || dia > 31) {
          registrarOcorrencia('festa sem dia válido', rotuloRel, 'diaFesta', textoEdge, '-');
          return;
        }

        var diaFestaFormatado = dia + ' de ' + NOMES_MESES_MAPA[mesNum - 1];
        var ehPadraoSimples = (textoEdge.replace(/\s+/g, ' ').toLowerCase() === ('dia ' + dia));
        festasCandidatas.push({
          dia: dia,
          mesNum: mesNum,
          textoFormatado: diaFestaFormatado,
          textoOriginal: textoEdge,
          ehPadrao: ehPadraoSimples
        });
        return;
      }

      if (noOrigem.level === nivelTitulos) {
        if (noOrigem.categoria === categoriaTitulo) {
          var tituloNorm = normalizarSemAcentoMaiuscula(noOrigem.label);
          if (titulosIgnoradosSet.has(tituloNorm)) return;
          var tituloCap = capitalizarTituloLiturgico(noOrigem.label);
          if (tituloCap && !titulosVistos.has(tituloCap)) {
            titulosVistos.add(tituloCap);
            titulos.push(tituloCap);
          }
        } else {
          registrarOcorrencia('dúvida título', rotuloRel, 'atributoLiturgico', String(noOrigem.label || ''), '(categoria inesperada)');
        }
      }
    });

    var rawAno = n[campoAno];
    var anoMortePositivo = null;
    var anoInvalidoTexto = '';
    if (rawAno !== undefined && rawAno !== null && String(rawAno).trim() !== '') {
      var strAno = String(rawAno).trim();
      if (/^\d+$/.test(strAno) && parseInt(strAno, 10) > 0) {
        anoMortePositivo = parseInt(strAno, 10);
      } else {
        anoInvalidoTexto = strAno;
      }
    }

    var dataMorteGrafo = (n[campoDataMorte] !== undefined && n[campoDataMorte] !== null)
      ? String(n[campoDataMorte]).trim()
      : '';

    var localId = n[campoLocalNasc];
    var paisIsoDireto = n[campoPaisNasc];
    var cidadeGrafo = '';
    var paisGrafo = '';
    var isoGrafo = '';
    var latGrafo = null;
    var lngGrafo = null;

    if (localId && paisIsoDireto) {
      comConflito.push(idStr + ' (' + nomeSanto + ')');
    }

    if (localId) {
      var localNo = nosPorId[String(localId)];
      if (!localNo) {
        locaisInexistentes.add(String(localId));
      } else {
        paisGrafo = String(localNo[campoPais] || '').trim();
        cidadeGrafo = limparNomeCidadeMapa(localNo.label, paisGrafo);
        isoGrafo = String(localNo[campoIso] || '').trim().toUpperCase();
        if (ehNumeroCoordValido(localNo[campoLat]) && ehNumeroCoordValido(localNo[campoLng])) {
          latGrafo = Number(localNo[campoLat]);
          lngGrafo = Number(localNo[campoLng]);
        } else {
          locaisSemCoord.add(String(localId) + ' (' + localNo.label + ')');
        }
        if (isoGrafo && !mapaPaisesCfg[isoGrafo]) isosSemTabela.add(isoGrafo);
      }
    } else if (paisIsoDireto) {
      isoGrafo = String(paisIsoDireto).trim().toUpperCase();
      if (isoGrafo && !mapaPaisesCfg[isoGrafo]) isosSemTabela.add(isoGrafo);
      paisGrafo = (mapaPaisesCfg[isoGrafo] && mapaPaisesCfg[isoGrafo].nome) || '';
    }

    var itemGrafo = {
      idGrafo: idStr,
      nome: nomeSanto,
      atributoLiturgico: titulos.join(' e '),
      festasCandidatas: festasCandidatas,
      anoMortePositivo: anoMortePositivo,
      anoInvalidoTexto: anoInvalidoTexto,
      dataMorteGrafo: dataMorteGrafo,
      cidade: cidadeGrafo,
      pais: paisGrafo,
      iso: isoGrafo,
      lat: latGrafo,
      lng: lngGrafo,
      localIdGrafo: localId ? String(localId) : null
    };
    santosGrafo.push(itemGrafo);
    grafoPorId[idStr] = itemGrafo;

    var chaveNome = normalizarChaveNomeSanto(nomeSanto);
    if (chaveNome) {
      if (!grafoPorNomeNorm[chaveNome]) grafoPorNomeNorm[chaveNome] = [];
      grafoPorNomeNorm[chaveNome].push(itemGrafo);
    }
  });

  // Índice de coordenadas conhecidas no grafo por cidade+ISO (para avulso sem lat/lng)
  var coordGrafoPorCidadeIso = {};
  var idLocalGrafoPorCidadeIso = {};
  (todosNos || []).forEach(function(n) {
    if (!n[campoPais] && !n[campoIso] && !ehNumeroCoordValido(n[campoLat])) return;
    var nomePaisLoc = String(n[campoPais] || '').trim();
    var cidadeLoc = limparNomeCidadeMapa(n.label, nomePaisLoc);
    var isoLoc = String(n[campoIso] || '').trim().toUpperCase();
    if (!cidadeLoc) return;
    var chaveCid = normalizarSemAcentoMaiuscula(cidadeLoc) + '|' + isoLoc;
    if (!idLocalGrafoPorCidadeIso[chaveCid]) idLocalGrafoPorCidadeIso[chaveCid] = String(n.id);
    if (!coordGrafoPorCidadeIso[chaveCid] && ehNumeroCoordValido(n[campoLat]) && ehNumeroCoordValido(n[campoLng])) {
      coordGrafoPorCidadeIso[chaveCid] = { lat: Number(n[campoLat]), lng: Number(n[campoLng]) };
    }
  });

  // 2) Ler e validar santos-avulsos.json (se configurado em regras.mapa)
  var avulsosValidos = [];
  var idsAvulsosVistos = new Set();

  if (cfg.arquivoAvulsos && pastaAtual) {
    var caminhoAvulsos = path.join(pastaAtual, cfg.arquivoAvulsos);
    if (fs.existsSync(caminhoAvulsos)) {
      try {
        var bruto = fs.readFileSync(caminhoAvulsos, 'utf8').replace(/^\uFEFF/, '');
        var jsonAv = JSON.parse(bruto);
        if (!jsonAv || !Array.isArray(jsonAv.santos)) {
          throw new Error('Estrutura inválida: esperado objeto com array "santos".');
        }
        jsonAv.santos.forEach(function(a) {
          var idAv = String(a && a.id ? a.id : '').trim();
          var nomeAv = String(a && a.nome ? a.nome : '').trim();
          if (!idAv || idsAvulsosVistos.has(idAv)) {
            registrarOcorrencia('id de avulso repetido', (idAv || '(sem id)') + ' - ' + nomeAv, 'id', '(já existente)', '(segundo descartado)');
            return;
          }
          idsAvulsosVistos.add(idAv);
          avulsosValidos.push(a);
        });
      } catch (erroAv) {
        console.error('  [MAPA ERRO] JSON inválido em "' + cfg.arquivoAvulsos + '": ' + erroAv.message + ' (gerando só com o grafo)');
        registrarOcorrencia('avulso ignorado por JSON inválido', '-', cfg.arquivoAvulsos, '(mantido apenas grafo)', erroAv.message);
        avulsosValidos = [];
      }
    }
  }

  // 3) Casar avulsos <-> santos do grafo
  var avulsoPorIdGrafo = {};
  var grafoIdsCasados = new Set();
  var avulsosPuros = [];
  var qtdAvulsosSubstituidos = 0;

  avulsosValidos.forEach(function(a) {
    if (!a.idGrafo) return;
    var idG = String(a.idGrafo).trim();
    if (!grafoPorId[idG]) {
      registrarOcorrencia('idGrafo inexistente', String(a.id) + ' - ' + String(a.nome || ''), 'idGrafo', idG, '(tratado sem vínculo com grafo)');
      avulsosPuros.push(a);
      return;
    }
    if (avulsoPorIdGrafo[idG]) {
      registrarOcorrencia('idGrafo duplicado nos avulsos', String(a.id) + ' - ' + String(a.nome || ''), 'idGrafo', idG, '(segundo avulso descartado)');
      return;
    }
    avulsoPorIdGrafo[idG] = a;
    grafoIdsCasados.add(idG);
    qtdAvulsosSubstituidos++;
  });

  avulsosValidos.forEach(function(a) {
    if (a.idGrafo) return;
    var chaveAv = normalizarChaveNomeSanto(a.nome);
    var candidatosExatos = (chaveAv && grafoPorNomeNorm[chaveAv]) ? grafoPorNomeNorm[chaveAv] : [];

    candidatosExatos.forEach(function(g) {
      if (grafoIdsCasados.has(g.idGrafo)) return;
      registrarOcorrencia(
        'provável duplicata',
        String(a.id) + ' - ' + String(a.nome || ''),
        'nome',
        g.idGrafo + ' - ' + g.nome,
        String(a.id) + ' - ' + String(a.nome || '')
      );
    });

    santosGrafo.forEach(function(g) {
      if (grafoIdsCasados.has(g.idGrafo)) return;
      if (nomesSaoProvavelDuplicata(a.nome, g.nome)) {
        registrarOcorrencia(
          'provável duplicata',
          String(a.id) + ' - ' + String(a.nome || ''),
          'nome',
          g.idGrafo + ' - ' + g.nome,
          String(a.id) + ' - ' + String(a.nome || '')
        );
      }
    });

    avulsosPuros.push(a);
  });

  // 4) Montar lista unificada de santos (fusão + inferências)
  var santosComNascimento = [];
  var semNascimentoFinal = [];

  function resolverFestaDoGrafo(g, dataMorteAvulso, registrarEventos) {
    var candidatas = g.festasCandidatas || [];
    if (candidatas.length === 0) return '';
    var rotuloRel = g.idGrafo + ' - ' + g.nome;

    if (candidatas.length === 1) {
      var unica = candidatas[0];
      if (registrarEventos && !unica.ehPadrao) {
        registrarOcorrencia('festa texto fora do padrão', rotuloRel, 'diaFesta', unica.textoOriginal, unica.textoFormatado);
      }
      return unica.textoFormatado;
    }

    var escolhida = null;
    var motivo = '';
    var dmMorte = dataMorteAvulso ? extrairDiaMesDeTexto(dataMorteAvulso) : null;

    if (dmMorte) {
      escolhida = candidatas.find(function(c) {
        return c.dia === dmMorte.dia && c.mesNum === dmMorte.mesNum;
      }) || null;
      if (escolhida) motivo = 'coincide com data_morte';
    }

    if (!escolhida) {
      var ordenadas = candidatas.slice().sort(function(a, b) {
        if (a.ehPadrao !== b.ehPadrao) return a.ehPadrao ? -1 : 1;
        return 0;
      });
      escolhida = ordenadas[0];
      motivo = 'empate/mais completo';
    }

    if (registrarEventos) {
      var descartadas = candidatas
        .filter(function(c) { return c !== escolhida; })
        .map(function(c) { return c.textoFormatado + ' (' + c.textoOriginal + ')'; })
        .join(', ');
      registrarOcorrencia('escolha entre duas festas', rotuloRel, 'diaFesta', descartadas, escolhida.textoFormatado + ' [' + motivo + ']');
    }
    return escolhida.textoFormatado;
  }

  function consolidarSanto(g, a) {
    var rotuloRel = g ? (g.idGrafo + ' - ' + g.nome) : (String(a.id) + ' - ' + String(a.nome || ''));

    var avNome = a && a.nome ? String(a.nome).trim() : '';
    var avAtrib = a && a.atributo_liturgico ? String(a.atributo_liturgico).trim() : '';
    var avFesta = a && a.dia_festa_liturgica ? String(a.dia_festa_liturgica).trim() : '';
    var avCidade = a && a.cidade_nascimento ? String(a.cidade_nascimento).trim() : '';
    var avPais = a && a.pais_nascimento ? String(a.pais_nascimento).trim() : '';
    var avIso = a && a.iso ? String(a.iso).trim().toUpperCase() : '';
    var avMorte = a && a.data_morte ? String(a.data_morte).trim() : '';
    var avTemCoord = a && ehNumeroCoordValido(a.lat) && ehNumeroCoordValido(a.lng);

    var nomeFinal = avNome || (g ? g.nome : '');
    var attribFinal = avAtrib || (g ? g.atributoLiturgico : '');
    var festaGrafo = g ? resolverFestaDoGrafo(g, avMorte || g.dataMorteGrafo, !avFesta) : '';
    var festaFinal = avFesta || festaGrafo;

    var cidadeFinal = avCidade || (g ? g.cidade : '');
    var isoFinal = avIso || (g ? g.iso : '');
    if (isoFinal && !mapaPaisesCfg[isoFinal]) isosSemTabela.add(isoFinal);

    var paisFinal = avPais || (g ? g.pais : '');
    if (!paisFinal && isoFinal && mapaPaisesCfg[isoFinal]) {
      paisFinal = mapaPaisesCfg[isoFinal].nome;
    }

    // Santo sem local/país de nascimento não entra no mapa e vai para lista de sem nascimento
    if (!cidadeFinal && !isoFinal && !paisFinal) {
      semNascimentoFinal.push(rotuloRel);
      return;
    }

    var morteFinal = '';
    if (avMorte) {
      morteFinal = avMorte;
    } else if (g && g.dataMorteGrafo) {
      morteFinal = g.dataMorteGrafo;
    } else if (g && g.anoMortePositivo !== null) {
      var dmFesta = festaFinal ? extrairDiaMesDeTexto(festaFinal) : null;
      if (dmFesta) {
        morteFinal = festaFinal + ' de ' + g.anoMortePositivo;
        registrarOcorrencia('dado inferido', rotuloRel, 'dataMorte', String(g.anoMortePositivo), morteFinal);
      } else {
        morteFinal = String(g.anoMortePositivo);
      }
    } else if (g && g.anoInvalidoTexto) {
      registrarOcorrencia('ano inválido para inferência', rotuloRel, 'dataMorte', g.anoInvalidoTexto, '-');
    }

    if (!festaFinal && morteFinal) {
      var dmDeMorte = extrairDiaMesDeTexto(morteFinal);
      if (dmDeMorte) {
        festaFinal = dmDeMorte.diaMesStr;
        registrarOcorrencia('dado inferido', rotuloRel, 'diaFesta', '-', festaFinal);
      }
    }

    if (g && a) {
      var comparacoes = [
        ['nome', g.nome, avNome],
        ['atributoLiturgico', g.atributoLiturgico, avAtrib],
        ['diaFesta', festaGrafo, avFesta],
        ['cidade', g.cidade, avCidade],
        ['pais', g.pais, avPais],
        ['iso', g.iso, avIso],
        ['dataMorte', (g.dataMorteGrafo || (g.anoMortePositivo !== null ? String(g.anoMortePositivo) : g.anoInvalidoTexto)), avMorte]
      ];
      comparacoes.forEach(function(par) {
        var campo = par[0], valG = par[1], valA = par[2];
        if (valG && valA && valG !== valA) {
          registrarOcorrencia('substituição de campo', rotuloRel, campo, valG, valA);
        }
      });
    }

    var latFinal = avTemCoord ? Number(a.lat) : (g ? g.lat : null);
    var lngFinal = avTemCoord ? Number(a.lng) : (g ? g.lng : null);

    santosComNascimento.push({
      id: g ? g.idGrafo : String(a.id),
      nome: nomeFinal,
      atributoLiturgico: attribFinal,
      diaFesta: festaFinal,
      cidade: cidadeFinal,
      pais: paisFinal,
      iso: isoFinal,
      dataMorte: morteFinal,
      idGrafo: g ? g.idGrafo : null,
      temGrafo: !!g,
      _lat: latFinal,
      _lng: lngFinal,
      _temCoordAvulso: avTemCoord,
      _localIdGrafo: (g && g.localIdGrafo && normalizarSemAcentoMaiuscula(cidadeFinal) === normalizarSemAcentoMaiuscula(g.cidade) && isoFinal === g.iso) ? g.localIdGrafo : null,
      _rotuloRel: rotuloRel
    });
  }

  santosGrafo.forEach(function(g) {
    consolidarSanto(g, avulsoPorIdGrafo[g.idGrafo] || null);
  });
  avulsosPuros.forEach(function(a) {
    consolidarSanto(null, a);
  });

  // 5) Unificar bolhas de cidades (nome limpo normalizado + ISO; coordenadas do avulso prevalecem)
  var cidadesMapa = {};

  santosComNascimento.forEach(function(s) {
    if (!s.cidade) {
      s.cidadeId = null;
      return;
    }
    var chaveCid = normalizarSemAcentoMaiuscula(s.cidade) + '|' + s.iso;
    if (!cidadesMapa[chaveCid]) {
      var idCidPadrao = s._localIdGrafo || idLocalGrafoPorCidadeIso[chaveCid] ||
        ('cid_' + normalizarSemAcentoMaiuscula(s.cidade).replace(/[^A-Z0-9]+/g, '_').toLowerCase() + (s.iso ? '_' + s.iso : ''));
      cidadesMapa[chaveCid] = {
        id: idCidPadrao,
        nome: s.cidade,
        pais: s.pais,
        iso: s.iso,
        lat: null,
        lng: null,
        latAvulso: null,
        lngAvulso: null,
        latGrafo: null,
        lngGrafo: null,
        santos: []
      };
    }
    var cid = cidadesMapa[chaveCid];
    if (!cid.pais && s.pais) cid.pais = s.pais;

    if (s._temCoordAvulso) {
      if (cid.latAvulso === null) {
        cid.latAvulso = s._lat;
        cid.lngAvulso = s._lng;
      } else if (cid.latAvulso !== s._lat || cid.lngAvulso !== s._lng) {
        registrarOcorrencia(
          'coordenada divergente',
          s._rotuloRel,
          'lat/lng',
          cid.latAvulso + ',' + cid.lngAvulso,
          s._lat + ',' + s._lng + ' (mantida primeira do avulso)'
        );
      }
    } else if (ehNumeroCoordValido(s._lat) && ehNumeroCoordValido(s._lng)) {
      if (cid.latGrafo === null) {
        cid.latGrafo = s._lat;
        cid.lngGrafo = s._lng;
      }
    }
    cid.santos.push(s);
  });

  var cidadesSaida = [];
  Object.keys(cidadesMapa).forEach(function(chaveCid) {
    var cid = cidadesMapa[chaveCid];
    if (cid.santos.length === 0) return;

    if (cid.latAvulso === null && cid.latGrafo === null && coordGrafoPorCidadeIso[chaveCid]) {
      cid.latGrafo = coordGrafoPorCidadeIso[chaveCid].lat;
      cid.lngGrafo = coordGrafoPorCidadeIso[chaveCid].lng;
    }

    if (cid.latAvulso !== null && cid.latGrafo !== null &&
        (cid.latAvulso !== cid.latGrafo || cid.lngAvulso !== cid.lngGrafo)) {
      registrarOcorrencia(
        'coordenada divergente do grafo',
        cid.nome + ' (' + cid.iso + ')',
        'lat/lng',
        cid.latGrafo + ',' + cid.lngGrafo,
        cid.latAvulso + ',' + cid.lngAvulso
      );
    }

    var latFinalCid = (cid.latAvulso !== null) ? cid.latAvulso : cid.latGrafo;
    var lngFinalCid = (cid.lngAvulso !== null) ? cid.lngAvulso : cid.lngGrafo;

    if (!ehNumeroCoordValido(latFinalCid) || !ehNumeroCoordValido(lngFinalCid)) {
      cid.santos.forEach(function(s) {
        s.cidadeId = null;
        registrarOcorrencia('cidade sem coordenada', s._rotuloRel, 'cidade', cid.nome + ' (' + cid.iso + ')', '(sem bolha de cidade)');
      });
      console.warn('  [MAPA AVISO] Cidade sem coordenadas (avulso/grafo): ' + cid.nome + ' (' + cid.iso + ')');
      return;
    }

    var qtdGrafoCid = 0;
    cid.santos.forEach(function(s) {
      s.cidadeId = cid.id;
      if (s.temGrafo) qtdGrafoCid++;
    });

    cidadesSaida.push({
      id: cid.id,
      nome: cid.nome,
      pais: cid.pais,
      iso: cid.iso,
      lat: latFinalCid,
      lng: lngFinalCid,
      qtd: cid.santos.length,
      qtdGrafo: qtdGrafoCid
    });
  });

  // 6) Contagem de países
  var contagemPaises = {};
  santosComNascimento.forEach(function(s) {
    if (!s.iso || !mapaPaisesCfg[s.iso]) return;
    if (!contagemPaises[s.iso]) contagemPaises[s.iso] = { qtd: 0, qtdGrafo: 0 };
    contagemPaises[s.iso].qtd++;
    if (s.temGrafo) contagemPaises[s.iso].qtdGrafo++;
  });

  var paisesSaida = [];
  var somaPaises = 0;
  Object.keys(contagemPaises).forEach(function(iso) {
    var info = contagemPaises[iso];
    if (info.qtd === 0) return;
    var cfgPais = mapaPaisesCfg[iso];
    somaPaises += info.qtd;
    paisesSaida.push({
      iso: iso,
      nome: cfgPais.nome,
      lat: cfgPais.lat,
      lng: cfgPais.lng,
      qtd: info.qtd,
      qtdGrafo: info.qtdGrafo
    });
  });

  var santosSaida = santosComNascimento.map(function(s) {
    return {
      id: s.id,
      nome: s.nome,
      atributoLiturgico: s.atributoLiturgico,
      diaFesta: s.diaFesta,
      cidade: s.cidade,
      pais: s.pais,
      iso: s.iso,
      dataMorte: s.dataMorte,
      cidadeId: s.cidadeId || null,
      idGrafo: s.idGrafo,
      temGrafo: s.temGrafo
    };
  });

  // 7) Gravar relatório acumulativo (se configurado em regras.mapa)
  var qtdNovasRelatorio = 0;
  if (cfg.arquivoRelatorio && pastaAtual) {
    var caminhoRel = path.join(pastaAtual, cfg.arquivoRelatorio);
    qtdNovasRelatorio = gravarRelatorioAcumulativo(caminhoRel, ocorrenciasRelatorio);
  }

  console.log(
    '  [MAPA "' + nomeGrafo + '"] Santos contados (com nascimento): ' + santosSaida.length +
    ' | Sem nascimento: ' + semNascimentoFinal.length +
    ' | Soma dos países: ' + somaPaises +
    ' | Excluídos: ' + qtdExcluidosAplicados +
    ' | Avulsos lidos: ' + avulsosValidos.length +
    ' (substituídos: ' + qtdAvulsosSubstituidos + ', novos: ' + avulsosPuros.length + ')' +
    ' | Relatório: ' + ocorrenciasRelatorio.length + ' ocorrências (' + qtdNovasRelatorio + ' novas)'
  );
  if (semNascimentoFinal.length > 0) console.warn('  [MAPA AVISO] Santos sem nascimento (' + semNascimentoFinal.length + '): ' + semNascimentoFinal.join(', '));
  if (comConflito.length > 0) console.warn('  [MAPA AVISO] Santos com localNasc e paisNasc simultâneos (usado localNasc): ' + comConflito.join(', '));
  if (locaisInexistentes.size > 0) console.warn('  [MAPA AVISO] localNasc inexistente: ' + Array.from(locaisInexistentes).join(', '));
  if (locaisSemCoord.size > 0) console.warn('  [MAPA AVISO] Locais sem lat/lng: ' + Array.from(locaisSemCoord).join(', '));
  if (isosSemTabela.size > 0) console.warn('  [MAPA AVISO] ISOs sem entrada em regras.mapa.paises: ' + Array.from(isosSemTabela).join(', '));
  if (ocorrenciasRelatorio.length > 0) {
    console.log('  [MAPA RELATÓRIO] ' + ocorrenciasRelatorio.map(function(o) {
      return o.tipo + ': ' + o.santo + ' (' + o.campo + ')';
    }).join(' | '));
  }

  return {
    santos: santosSaida,
    cidades: cidadesSaida,
    paises: paisesSaida
  };
}

function main() {
  var nomesDosGrafos = encontrarPastasDeGrafo();

  if (nomesDosGrafos.length === 0) {
    console.log('Nenhuma pasta de grafo encontrada. Nada a fazer.');
    return;
  }

  var sucesso = 0, falhas = 0;

  nomesDosGrafos.forEach(function(nomeGrafo) {
    var pastaAtual = path.join(PASTA_GRAFOS, nomeGrafo);
    var arquivoEntrada = path.join(pastaAtual, 'dados-grafo.js');
    var arquivoSaida = path.join(pastaAtual, 'dados-com-posicoes.json');

    if (!fs.existsSync(arquivoEntrada)) {
      console.warn('AVISO: pasta "' + nomeGrafo + '" não tem "dados-grafo.js". Pulando.');
      return;
    }

    try {
      delete require.cache[require.resolve(arquivoEntrada)];
      var dados = require(arquivoEntrada);

      var regrasCarregadas = dados.regras || null;
      if (!regrasCarregadas) {
        console.warn('AVISO: pasta "' + nomeGrafo + '" não tem "regras" em dados-grafo.js. Usando padrão.');
      }

      var resultadoCalculo = calcularPosicoesDeUmGrafo(dados.todosNos, dados.todosSetas, regrasCarregadas);
      // "regras" vai junto no JSON de saída — a página passa a buscar
      // só esse arquivo, sem precisar de uma 2ª requisição separada
      // pro conteúdo de regras (evita fonte extra de cache/defasagem).
      var resultado = {
        nodes: resultadoCalculo.nodes,
        edges: dados.todosSetas,
        regras: mesclarComPadrao(regrasCarregadas),
        bandasEpoca: resultadoCalculo.bandasEpoca,
        bandasNiveis: resultadoCalculo.bandasNiveis
      };
      fs.writeFileSync(arquivoSaida, JSON.stringify(resultado, null, 2), 'utf8');
      console.log('OK: "' + nomeGrafo + '" -> ' + resultadoCalculo.nodes.length + ' nós, ' + dados.todosSetas.length + ' arestas.');

      if (regrasCarregadas && regrasCarregadas.mapa) {
        var arquivoSaidaMapa = path.join(pastaAtual, 'dados-mapa.json');
        var dadosMapa = gerarDadosDoMapa(dados.todosNos, dados.todosSetas, regrasCarregadas, nomeGrafo, pastaAtual);
        fs.writeFileSync(arquivoSaidaMapa, JSON.stringify(dadosMapa, null, 2), 'utf8');
      }

      sucesso++;
    } catch (erro) {
      console.error('ERRO ao processar "' + nomeGrafo + '": ' + erro.message);
      falhas++;
    }
  });

  console.log('----------------------------------------');
  console.log('Grafos processados com sucesso: ' + sucesso);
  console.log('Grafos com erro: ' + falhas);
}

module.exports = { calcularPosicoesDeUmGrafo: calcularPosicoesDeUmGrafo };

if (require.main === module) {
  main();
}


// FIM calcular-posicoes.js
