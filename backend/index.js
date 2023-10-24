const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const favoriteUsers = [];

app.post('/users', (req, res) => {
  const user = req.body;

  const existingUser = favoriteUsers.find((u) => u.username === user.username);
  if (existingUser) {
    return res.status(400).json({ error: 'Usuário já está na lista de favoritos' });
  }

  if (favoriteUsers.length >= 5) {
    return res.status(400).json({ error: 'Limite máximo de 5 usuários favoritos atingido' });
  }

  favoriteUsers.push(user);
  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(favoriteUsers);
});

app.delete('/users/:username', (req, res) => {
  const username = req.params.username;
  const index = favoriteUsers.findIndex((user) => user.username === username);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado na lista de favoritos' });
  }

  favoriteUsers.splice(index, 1);
  res.json({ message: 'Usuário removido dos favoritos' });
});

app.patch('/users/:username/toggle-star', (req, res) => {
  const username = req.params.username;
  const user = favoriteUsers.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado na lista de favoritos' });
  }

  user.starred = !user.starred;
  res.json(user);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
  });
}

module.exports = app; 

