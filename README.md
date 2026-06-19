# Magic-cards
lista de cartas de magic unindo minha necessidade de entre minhas necessidades academicas e pessoais

## Como executar
 
O app precisa de **dois processos rodando ao mesmo tempo**, em terminais
separados: a API (backend) e o app (frontend).
 
### Terminal 1 — Backend (API)
 
```
cd backend
node server-api.js
```
 
Saída esperada:
```
API de cartas Magic (CRUD) na porta 3005!
```
 
Na primeira execução, o `db.js` cria o arquivo `cartas.db` e popula a tabela com
10 cartas iniciais. Para conferir a API diretamente no navegador:
 
```
http://localhost:3005/minha-api/cartas
```
 
### Terminal 2 — Frontend (app)
 
```
ionic serve
```
 
O app abre em `http://localhost:8100`. A coleção fica em `/cartas`.
 
---
 
## A API
 
Base: `http://localhost:3005/minha-api`
 
| Método | Rota          | Descrição                  |
|--------|---------------|----------------------------|
| GET    | `/cartas`     | Lista todas as cartas      |
| GET    | `/cartas/:id` | Retorna uma carta por id   |
| POST   | `/cartas`     | Cria uma nova carta        |
| PUT    | `/cartas/:id` | Atualiza uma carta         |
| DELETE | `/cartas/:id` | Exclui uma carta           |
 
### Modelo de uma carta
 
```json
{
  "id": 1,
  "nome": "Azula, Crown Princess",
  "tipo": "Lenda — Planeswalker",
  "conteudo": "Fogo azul controla o campo de batalha.",
  "custo_mana": "{1}{U}{B}{R}",
  "valor_mana": 4,
  "preco": 24.90
}
```
 
- **custo_mana**: string no formato Magic (`{1}{U}{B}{R}`), exibida como símbolos
  coloridos no app.
- **valor_mana**: valor de mana convertido (CMC), usado para ordenação/filtro.
---
 
## Funcionalidades (CRUD)
 
- **Listar**: a página de cartas carrega a coleção da API ao abrir.
- **Criar**: o botão flutuante (+) abre um modal com formulário em branco.
- **Editar**: o ícone de lápis em cada card abre o modal preenchido.
- **Excluir**: o ícone de lixeira pede confirmação antes de remover.
Após cada operação, a lista é recarregada a partir da API, garantindo que a tela
reflete sempre o estado do banco.
 
---
