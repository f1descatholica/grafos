// ============================================================
// LIVRO DE RECEITAS DO GRAFO "g-santos"
// Muda um número aqui, o build e o motor obedecem sozinhos.
// ============================================================
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();       // uso no calculador (Node)
  } else {
    root.RegrasGrafoSantos = factory(); // uso no motor (navegador)
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return {
    // Traduz "papel" -> nome real do campo na base deste grafo
    dicionario: {
      chaveOrdenacao: 'ano',        // campo usado pra ordenar dentro do nível
      agrupamento: 'categoria',     // campo que separa em fileiras diferentes
      mesReferencia: 'mesNumero'    // campo do nó de mês que dá o número do mês
    },

    // Números de layout
    layout: {
      nosPorFileira: 20,
      minimoAntesQuebraSeculo: 10,
      alturaPorFileira: 150,
      numLinhasInternas: 2,
      usaQuebraPorEpoca: true       // se false, ignora século e só quebra por 20
    },

    // Cores fixas por grupo — só entra aqui quem PRECISA ser garantido.
    // Grupo que não está na lista usa o sistema automático de sempre.
    cores: {
      'ideia': { background: '#059669', border: '#047857' }
    }
  };
}));
