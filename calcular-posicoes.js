// ============================================================
// CALCULADOR DE POSIÇÕES — VERSÃO GENÉRICA (N GRAFOS)
// ============================================================
// MUDANÇA IMPORTANTE NESTA VERSÃO:
// - O campo "fileira" SAIU dos dados brutos. Agora o próprio
//   calculador decide quantas linhas (fileiras) cada nível precisa,
//   olhando só pra "categoria" (se existir) e pra contagem de nós.
// - Regra: nós da MESMA categoria ficam sempre juntos, nunca dividem
//   linha com outra categoria. Só quando uma categoria sozinha passa
//   linha com outra categoria. Só quando uma categoria sozinha passa
//   de NOS_POR_FILEIRA, ela quebra em mais de uma linha.
// - Nós sem "categoria" continuam se comportando como uma linha só
//   (ou várias, se passarem do limite).
// - A altura de cada nível não é mais fixa: ela cresce de acordo com
//   quantas linhas (fileiras) aquele nível realmente tem.
// ============================================================

const fs = require('fs');
const path = require('path');

const PASTA_GRAFOS = __dirname;
const PASTAS_IGNORADAS = ['.github', '.git', 'node_modules'];

// -------- PAINEL DE AJUSTE FINO (mexa só aqui) --------
const NOS_POR_FILEIRA = 20;        // quantos nós cabem numa linha antes de quebrar pra próxima
const ALTURA_POR_FILEIRA = 150;    // altura reservada pra CADA linha (fileira) dentro do nível
const NUM_LINHAS_INTERNAS = 2;     // quantas "prateleiras" de altura dentro de uma fileira (zig-zag)
const ESPACAMENTO_NO_BASE = 150;   // espaço mínimo garantido entre nós, no eixo X
const ESPACAMENTO_POR_CARACTERE = 14;
const TAMANHO_MINIMO_LABEL = 3;
const TAMANHO_MAXIMO_LABEL = 40;
const NUM_PASSADAS = 6;            // passadas de refinamento do baricentro (eixo X)
const MINIMO_NOS_ANTES_QUEBRA_SECULO = 10; // fileira só quebra por troca de século se já tiver esse tanto de nós
// -------------------------------------------------------

// Extrai o número do dia de dentro do texto da aresta (ex: "Dia 15" -> 15)
function extrairDiaDoTexto(texto) {
  if (!texto) return null;
  var m = String(texto).match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

// Pra cada nó, calcula sua "data-chave" (mes*100+dia) olhando todas as
// arestas que chegam nele. Se o nó tiver mais de uma data (ex: S. Paulo
// em 3 meses), fica com a MENOR (a mais cedo no calendário).
// Nó sem nenhuma aresta de calendário -> fica de fora do mapa (undefined),
// e cai só no baricentro, como combinado.
function calcularSeculo(ano) {
  if (ano === undefined || ano === null) return null;
  return Math.floor((ano - 1) / 100) + 1;
}

function calcularDataChavePorNo(todosNos, todosSetas) {
  var mapaNo = {};
  todosNos.forEach(function(n) { mapaNo[n.id] = n; });

  // mês+dia mais cedo por santo (igual antes, só como refinamento)
  var mesDiaPorNo = {};
  todosSetas.forEach(function(s) {
    var noOrigem = mapaNo[s.from];
    if (!noOrigem || noOrigem.mesNumero === undefined || noOrigem.mesNumero === null) return;
    var dia = extrairDiaDoTexto(s.texto);
    if (dia === null) return;
    var chaveMD = noOrigem.mesNumero * 100 + dia;
    var atual = mesDiaPorNo[s.to];
    if (atual === undefined || chaveMD < atual) mesDiaPorNo[s.to] = chaveMD;
  });

  // Chave final: SEM ano, não entra aqui (baricentro cuida, sem mudar de nível).
  // COM ano: ano é a base; se tiver mês+dia do calendário, refina dentro do ano.
  var dataChavePorNo = {};
  todosNos.forEach(function(n) {
    if (n.ano === undefined || n.ano === null) return;
    var md = mesDiaPorNo[n.id];
    dataChavePorNo[n.id] = (md !== undefined) ? (n.ano * 10000 + md) : (n.ano * 10000);
  });
  return dataChavePorNo;
}




// Agrupa os nós de UM nível em "fileiras" (linhas horizontais):
// primeiro separa por categoria (mantendo a ordem em que cada
// categoria aparece nos dados), depois quebra cada categoria em
// pedaços de no máximo NOS_POR_FILEIRA nós, na ordem original.
function construirFileirasDoNivel(nosDoNivel, dataChavePorNo) {
  var ordemCategorias = [];
  var gruposPorCategoria = {};

  nosDoNivel.forEach(function(n) {
    var chave = (n.categoria !== undefined && n.categoria !== null)
      ? String(n.categoria)
      : '__sem_categoria__';
    if (!gruposPorCategoria[chave]) {
      gruposPorCategoria[chave] = [];
      ordemCategorias.push(chave);
    }
    gruposPorCategoria[chave].push(n);
  });

  var fileiras = [];
  ordemCategorias.forEach(function(chave) {
    var nosDaCategoria = gruposPorCategoria[chave];
    nosDaCategoria.sort(function(a, b) {
      var da = dataChavePorNo[a.id];
      var db = dataChavePorNo[b.id];
      if (da === undefined || db === undefined) return 0;
      return da - db;
    });

    var fileiraAtual = [];
    var seculoAtual = null;
    nosDaCategoria.forEach(function(n) {
      var seculo = calcularSeculo(n.ano);
      var mudouSeculo = (seculoAtual !== null && seculo !== null && seculo !== seculoAtual);
      var podeQuebrarPorSeculo = mudouSeculo && fileiraAtual.length >= MINIMO_NOS_ANTES_QUEBRA_SECULO;
      if (fileiraAtual.length > 0 && (fileiraAtual.length >= NOS_POR_FILEIRA || podeQuebrarPorSeculo)) {
        fileiras.push(fileiraAtual);
        fileiraAtual = [];
      }
      fileiraAtual.push(n);
      if (seculo !== null) seculoAtual = seculo;
    });
    if (fileiraAtual.length > 0) fileiras.push(fileiraAtual);
  });
  return fileiras; // array de arrays de nós, já na ordem final de empilhamento
}


function calcularPosicoesDeUmGrafo(todosNos, todosSetas) {
  // 1. Agrupa nós por nível
  var nosPorNivel = {};
  todosNos.forEach(function(n) {
    if (!nosPorNivel[n.level]) nosPorNivel[n.level] = [];
    nosPorNivel[n.level].push(n);
  });
  var listaNiveis = Object.keys(nosPorNivel).map(Number).sort(function(a, b) { return a - b; });

  // 2. Constrói as fileiras de cada nível e calcula a altura total que
  //    cada nível vai ocupar (número de fileiras × altura por fileira)
  var dataChavePorNo = calcularDataChavePorNo(todosNos, todosSetas);

  var fileirasPorNivel = {};
  var alturaTotalPorNivel = {};
  listaNiveis.forEach(function(lvl) {
    var fileiras = construirFileirasDoNivel(nosPorNivel[lvl], dataChavePorNo);
    fileirasPorNivel[lvl] = fileiras;
    alturaTotalPorNivel[lvl] = fileiras.length * ALTURA_POR_FILEIRA;
  });

  // 3. Altura acumulada: onde cada nível começa no eixo Y (soma das
  //    alturas de todos os níveis anteriores — nunca mais nível × valor fixo)
  var yBasePorNivel = {};
  var acumulado = 0;
  listaNiveis.forEach(function(lvl) {
    yBasePorNivel[lvl] = acumulado;
    acumulado += alturaTotalPorNivel[lvl];
  });

  // 4. Para cada nó: define sua "linha visual" (nível+fileira computados,
  //    usada só pro agrupamento do eixo X) e seu Y final (nível acumulado
  //    + posição da fileira + sublinha em zig-zag dentro da fileira)
  var niveis = {};           // linhaVisualIndex -> array de ids (equivalente ao "niveis" da versão antiga)
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

  // 5. Baricentro pro eixo X — mesma lógica já validada antes, só que
  //    agora aplicada sobre as fileiras computadas, não sobre um campo
  //    "fileira" vindo pronto dos dados.
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
      return a.media - b.media;
    });
    niveis[lvl] = comMedia.map(function(o) { return o.id; });
    niveis[lvl].forEach(function(id, idx) { posX[id] = idx; });
  }

  for (var passada = 0; passada < NUM_PASSADAS; passada++) {
    for (var i = 0; i < listaLinhasVisuais.length; i++) ordenarNivelPorBaricentro(listaLinhasVisuais[i]);
    for (var j = listaLinhasVisuais.length - 1; j >= 0; j--) ordenarNivelPorBaricentro(listaLinhasVisuais[j]);
  }

  // Zig-zag calculado AGORA, com a posição horizontal já definitiva —
  // garante que vizinho na tela nunca cai no mesmo andar.
  listaNiveis.forEach(function(lvl) {
    fileirasPorNivel[lvl].forEach(function(nosDaFileira, indiceFileiraDentroDoNivel) {
      var idsOrdenados = niveis[listaLinhasVisuais.find(function(idx) {
        return niveis[idx].length === nosDaFileira.length &&
          niveis[idx].every(function(id) { return nosDaFileira.some(function(n) { return n.id === id; }); });
      })];
      idsOrdenados.forEach(function(id, posicaoFinalNaTela) {
        var subLinha = posicaoFinalNaTela % NUM_LINHAS_INTERNAS;
        var alturaFatia = ALTURA_POR_FILEIRA / NUM_LINHAS_INTERNAS;
        var yDentroDaFileira = (subLinha + 0.5) * alturaFatia;
        yFinalPorNo[id] = yBasePorNivel[lvl]
          + indiceFileiraDentroDoNivel * ALTURA_POR_FILEIRA
          + yDentroDaFileira;
      });
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

  // 6. Finalização: aplica x e y definitivos
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
      var nosComPosicao = calcularPosicoesDeUmGrafo(dados.todosNos, dados.todosSetas);
      var resultado = { nodes: nosComPosicao, edges: dados.todosSetas };
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
