// ============================================================
// CALCULADOR DE POSIÇÕES — VERSÃO GENÉRICA (N GRAFOS)
// Lê os dados E as regras de cada grafo de "dados-grafo.js" (arquivo
// único por pasta — regras-grafo.js foi consolidado aqui dentro).
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
  dicionario: { chaveOrdenacao: 'ano', agrupamento: 'categoria', mesReferencia: 'mesNumero' },
  layout: { nosPorFileira: 16, minimoAntesQuebraSeculo: 16, alturaPorFileira: 150, numLinhasInternas: 2, usaQuebraPorEpoca: true, quebrarSempreEntreCategorias: true },
  cores: {}
};

function mesclarComPadrao(regrasCarregadas) {
  regrasCarregadas = regrasCarregadas || {};
  return {
    dicionario: Object.assign({}, REGRAS_PADRAO.dicionario, regrasCarregadas.dicionario),
    layout: Object.assign({}, REGRAS_PADRAO.layout, regrasCarregadas.layout),
    cores: Object.assign({}, REGRAS_PADRAO.cores, regrasCarregadas.cores)
  };
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

  return todosNos.map(function(n) {
    return Object.assign({}, n, { x: xPorNo[n.id], y: yFinalPorNo[n.id] });
  });
}

function encontrarPastasDeGrafo() {
  return fs.readdirSync(PASTA_GRAFOS, { withFileTypes: true })
    .filter(function(item) { return item.isDirectory(); })
    .map(function(item) { return item.name; })
    .filter(function(nome) { return PASTAS_IGNORADAS.indexOf(nome) === -1; });
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

      var nosComPosicao = calcularPosicoesDeUmGrafo(dados.todosNos, dados.todosSetas, regrasCarregadas);
      // "regras" vai junto no JSON de saída — a página passa a buscar
      // só esse arquivo, sem precisar de uma 2ª requisição separada
      // pro conteúdo de regras (evita fonte extra de cache/defasagem).
      var resultado = {
        nodes: nosComPosicao,
        edges: dados.todosSetas,
        regras: mesclarComPadrao(regrasCarregadas)
      };
      fs.writeFileSync(arquivoSaida, JSON.stringify(resultado, null, 2), 'utf8');
      console.log('OK: "' + nomeGrafo + '" -> ' + nosComPosicao.length + ' nós, ' + dados.todosSetas.length + ' arestas.');
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
