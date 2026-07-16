// ============================================================
// CALCULADOR DE POSIÇÕES — VERSÃO GENÉRICA (N GRAFOS)
// ============================================================
// COMO ORGANIZAR OS ARQUIVOS (pastas de grafo na RAIZ do repositório):
//
//   (raiz do repositório)
//     nome-do-grafo-1/
//       dados-grafo.js
//     nome-do-grafo-2/
//       dados-grafo.js
//     calcular-posicoes.js   (este arquivo, também na raiz)
//     ...
//
// O QUE FAZ:
// - Varre a raiz do repositório sozinho, sem precisar editar este
//   arquivo quando você criar um grafo novo (basta criar a pasta).
// - Ignora pastas que não são de grafo (.github, .git, node_modules).
// - Para cada "dados-grafo.js" encontrado, calcula x/y (respeitando o
//   "level" que você já definiu à mão em cada nó) e salva um
//   "dados-com-posicoes.json" na MESMA pasta do grafo.
// - Um grafo com erro não impede os outros de serem calculados.
//
// COMO RODAR (GitHub Actions já faz isso sozinho):
//   node calcular-posicoes.js
// ============================================================

const fs = require('fs');
const path = require('path');

const PASTA_GRAFOS = __dirname;
const PASTAS_IGNORADAS = ['.github', '.git', 'node_modules'];
const ESPACAMENTO_NIVEL = 200;
const ESPACAMENTO_NO = 250;
const NUM_PASSADAS = 6;

function calcularPosicoesDeUmGrafo(todosNos, todosSetas) {
  var niveis = {};
  var nivelDoNo = {};
  todosNos.forEach(function(n) {
    var lvl = n.level;
    if (!niveis[lvl]) niveis[lvl] = [];
    niveis[lvl].push(n.id);
    nivelDoNo[n.id] = lvl;
  });

  var listaNiveis = Object.keys(niveis).map(Number).sort(function(a, b) { return a - b; });

  var vizinhos = {};
  todosNos.forEach(function(n) { vizinhos[n.id] = []; });
  todosSetas.forEach(function(e) {
    if (vizinhos[e.from]) vizinhos[e.from].push(e.to);
    if (vizinhos[e.to]) vizinhos[e.to].push(e.from);
  });

  var posX = {};
  listaNiveis.forEach(function(lvl) {
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
    comMedia.sort(function(a, b) { return a.media - b.media; });
    niveis[lvl] = comMedia.map(function(o) { return o.id; });
    niveis[lvl].forEach(function(id, idx) { posX[id] = idx; });
  }

  for (var passada = 0; passada < NUM_PASSADAS; passada++) {
    for (var i = 0; i < listaNiveis.length; i++) ordenarNivelPorBaricentro(listaNiveis[i]);
    for (var j = listaNiveis.length - 1; j >= 0; j--) ordenarNivelPorBaricentro(listaNiveis[j]);
  }

  return todosNos.map(function(n) {
    var idsDoNivel = niveis[n.level];
    var totalNivel = idsDoNivel.length;
    var indice = posX[n.id];
    var xCentralizado = (indice - (totalNivel - 1) / 2) * ESPACAMENTO_NO;
    var y = n.level * ESPACAMENTO_NIVEL;
    return Object.assign({}, n, { x: xCentralizado, y: y });
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
    console.log('Nenhuma pasta de grafo encontrada dentro de "grafos/". Nada a fazer.');
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

main();
