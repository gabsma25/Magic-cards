// backend/db.js
// Conexao com SQLite + criacao da tabela + populacao inicial (seed).
// O caminho do banco usa __dirname para ficar SEMPRE em backend/cartas.db,
// independente de qual pasta voce roda o "node".

const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, 'cartas.db'));

// Cria a tabela apenas se ainda nao existir.
db.exec(`
  CREATE TABLE IF NOT EXISTS cartas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    custo_mana TEXT NOT NULL,
    valor_mana INTEGER NOT NULL,
    preco REAL NOT NULL
  )
`);

// Popula com 10 cartas apenas se a tabela estiver vazia.
const total = db.prepare('SELECT COUNT(*) AS n FROM cartas').get();
if (total.n === 0) {
  // [nome, tipo, conteudo, custo_mana, valor_mana, preco]
  const cartas = [
    ['Azula, Crown Princess', 'Lenda — Planeswalker', 'Fogo azul controla o campo de batalha.', '{1}{U}{B}{R}', 4, 24.90],
    ['Lightning Bolt', 'Mágica Instantânea', 'Cause 3 de dano a qualquer alvo.', '{R}', 1, 5.50],
    ['Counterspell', 'Mágica Instantânea', 'Anule a mágica alvo.', '{U}{U}', 2, 3.80],
    ['Dark Ritual', 'Mágica Instantânea', 'Adicione {B}{B}{B}.', '{B}', 1, 2.20],
    ['Brainstorm', 'Mágica Instantânea', 'Compre 3 cartas, devolva 2 ao topo.', '{U}', 1, 1.90],
    ['Demonic Tutor', 'Feitiço', 'Busque qualquer carta no grimório.', '{1}{B}', 2, 28.00],
    ['Fireball', 'Feitiço', 'Cause X de dano distribuído.', '{X}{R}', 1, 4.30],
    ['Sol Ring', 'Artefato', 'Toque para adicionar {C}{C}.', '{1}', 1, 3.50],
    ['Grixis Panorama', 'Terreno', 'Busque um terreno básico azul, preto ou vermelho.', '', 0, 0.80],
    ['Nicol Bolas, Dragon-God', 'Lenda — Planeswalker', 'Domínio absoluto nas três cores.', '{U}{B}{B}{R}', 4, 18.00]
  ];

  const insert = db.prepare(
    'INSERT INTO cartas (nome, tipo, conteudo, custo_mana, valor_mana, preco) VALUES (?, ?, ?, ?, ?, ?)'
  );

  // transaction garante que todas as 10 entrem juntas (ou nenhuma).
  const inserirTodas = db.transaction((lista) => {
    for (const c of lista) {
      insert.run(...c);
    }
  });

  inserirTodas(cartas);
}

module.exports = db;