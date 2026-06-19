// backend/server-api.js
// Iniciar servidor:  node server-api.js
// API REST das cartas Magic (CRUD completo), conversando com o SQLite via db.js.

const express = require('express'); // npm install express
const cors = require('cors');       // npm install cors
const db = require('./db');         // mesmo diretorio (backend/)
const app = express();

app.use(express.json()); // le JSON do corpo (req.body)
app.use(cors());         // libera requisicoes de outros dominios (o app Ionic)

// ===== READ: todas as cartas =====
// GET localhost:3005/minha-api/cartas
app.get('/minha-api/cartas', (req, res) => {
  const cartas = db.prepare('SELECT * FROM cartas').all();
  res.json(cartas);
});

// ===== READ: uma carta por id =====
// GET localhost:3005/minha-api/cartas/3
app.get('/minha-api/cartas/:id', (req, res) => {
  const carta = db.prepare('SELECT * FROM cartas WHERE id = ?').get(req.params.id);
  if (!carta) {
    return res.status(404).json({ erro: 'Carta não encontrada' });
  }
  res.json(carta);
});

// ===== CREATE: inserir nova carta =====
// POST localhost:3005/minha-api/cartas
// Corpo: { nome, tipo, conteudo, custo_mana, valor_mana, preco }
app.post('/minha-api/cartas', (req, res) => {
  const { nome, tipo, conteudo, custo_mana, valor_mana, preco } = req.body;
  const info = db.prepare(
    'INSERT INTO cartas (nome, tipo, conteudo, custo_mana, valor_mana, preco) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(nome, tipo, conteudo, custo_mana, valor_mana, preco);

  res.status(201).json({
    id: info.lastInsertRowid,
    nome, tipo, conteudo, custo_mana, valor_mana, preco,
  });
});

// ===== UPDATE: editar carta existente =====
// PUT localhost:3005/minha-api/cartas/3
// Corpo: { nome, tipo, conteudo, custo_mana, valor_mana, preco }
app.put('/minha-api/cartas/:id', (req, res) => {
  const { nome, tipo, conteudo, custo_mana, valor_mana, preco } = req.body;
  const info = db.prepare(
    `UPDATE cartas
     SET nome = ?, tipo = ?, conteudo = ?, custo_mana = ?, valor_mana = ?, preco = ?
     WHERE id = ?`
  ).run(nome, tipo, conteudo, custo_mana, valor_mana, preco, req.params.id);

  // info.changes = quantas linhas foram afetadas. 0 = id nao existe.
  if (info.changes === 0) {
    return res.status(404).json({ erro: 'Carta não encontrada' });
  }
  res.json({ id: Number(req.params.id), nome, tipo, conteudo, custo_mana, valor_mana, preco });
});

// ===== DELETE: excluir carta =====
// DELETE localhost:3005/minha-api/cartas/3
app.delete('/minha-api/cartas/:id', (req, res) => {
  const info = db.prepare('DELETE FROM cartas WHERE id = ?').run(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ erro: 'Carta não encontrada' });
  }
  res.json({ ok: true, id: Number(req.params.id) });
});

app.listen(3005, () => console.log('API de cartas Magic (CRUD) na porta 3005!'));
