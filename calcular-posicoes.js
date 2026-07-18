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
const ESPACAMENTO_NO_BASE = 150;       // espaço mínimo garantido entre nós
const ESPACAMENTO_POR_CARACTERE = 14;  // espaço extra por letra do nome
const TAMANHO_MINIMO_LABEL = 3;        // piso: nome curto não gera espaço ínfimo
const TAMANHO_MAXIMO_LABEL = 40;       // teto: nome gigante não infla o nível todo
const NUM_PASSADAS = 6;
const DESNIVEL_MAXIMO = 130;            // variação vertical dentro do nível (ainda bem menor que ESPACAMENTO_NIVEL de 200, mas visível mesmo com o grafo muito mais largo que alto)

// Gera um número estável (0 a 999) a partir do texto do id — mesmo id
// sempre produz o mesmo resultado, então o desnível não "pula" entre
// execuções do robô, só muda se o id do nó mudar.
function hashEstavel(texto) {
  var h = 0;
  for (var i = 0; i < texto.length; i++) {
    h = (h * 31 + texto.charCodeAt(i)) % 1000;
  }
  return h;
}

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

  
  
  
  
  
  
  
  var mapaNoPorId = {};
  todosNos.forEach(function(n) { mapaNoPorId[n.id] = n; });

  // Validação forte: nunca confia cegamente no label recebido.
  function calcularLarguraNo(id) {
    var no = mapaNoPorId[id];
    var textoBase = (no && no.label !== undefined && no.label !== null)
      ? String(no.label).trim()
      : '';
    if (textoBase.length === 0) textoBase = String(id).trim(); // fallback: sem label, usa o id
    var comprimento = textoBase.length;
    if (comprimento < TAMANHO_MINIMO_LABEL) comprimento = TAMANHO_MINIMO_LABEL;
    if (comprimento > TAMANHO_MAXIMO_LABEL) comprimento = TAMANHO_MAXIMO_LABEL;
    return ESPACAMENTO_NO_BASE + comprimento * ESPACAMENTO_POR_CARACTERE;
  }

  var xPorNo = {};
  listaNiveis.forEach(function(lvl) {
    var idsOrdenados = niveis[lvl];
    var larguras = idsOrdenados.map(calcularLarguraNo);
    var larguraTotal = larguras.reduce(function(a, b) { return a + b; }, 0);
    var acumulado = 0;
    idsOrdenados.forEach(function(id, idx) {
      var w = larguras[idx];
      var centro = acumulado + w / 2;
      xPorNo[id] = centro - larguraTotal / 2;
      acumulado += w;
    });
  });

  return todosNos.map(function(n) {
    var fatorHash = hashEstavel(String(n.id)) / 1000; // 0 a 1, estável por id
    var desnivel = (fatorHash - 0.5) * 2 * DESNIVEL_MAXIMO; // entre -15 e +15
    var y = n.level * ESPACAMENTO_NIVEL + desnivel;
    return Object.assign({}, n, { x: xPorNo[n.id], y: y });
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
