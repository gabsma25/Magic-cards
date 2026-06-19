// backend/server-api.js
// Iniciar servidor:  node server-api.js
// API REST das cartas Magic, conversando com o SQLite via db.js.

const express = require('express'); // npm install express
const cors = require('cors');       // npm install cors
const db = require('./db');         // mesmo diretorio (backend/)
const app = express();

// Middleware: ensina o Express a ler JSON do corpo das requisicoes (req.body).
app.use(express.json());

// Middleware: libera CORS, permitindo que o app Ionic (outro dominio/porta)
// faca requisicoes para esta API.
app.use(cors());

// GET todas as cartas
// localhost:3005/minha-api/cartas
app.get('/minha-api/cartas', (req, res) => {
  const cartas = db.prepare('SELECT * FROM cartas').all();
  res.json(cartas);
});

// GET uma carta por id
// localhost:3005/minha-api/cartas/3
app.get('/minha-api/cartas/:id', (req, res) => {
  const carta = db.prepare('SELECT * FROM cartas WHERE id = ?').get(req.params.id);
  res.json(carta);
});

// POST inserir nova carta
// Corpo esperado (JSON): { nome, tipo, conteudo, custo_mana, valor_mana, preco }
app.post('/minha-api/cartas', (req, res) => {
  const { nome, tipo, conteudo, custo_mana, valor_mana, preco } = req.body;
  const info = db.prepare(
    'INSERT INTO cartas (nome, tipo, conteudo, custo_mana, valor_mana, preco) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(nome, tipo, conteudo, custo_mana, valor_mana, preco);

  res.status(201).json({
    id: info.lastInsertRowid,
    nome, tipo, conteudo, custo_mana, valor_mana, preco
  });
});

app.listen(3005, () => console.log('API de cartas Magic na porta 3005!'));