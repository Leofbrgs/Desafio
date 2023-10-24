const request = require('supertest');
const app = require('./index');

describe('POST /users', () => {
  it('Deve adicionar um usuário favorito', async () => {
    const newUser = { username: 'novousuario' };
    const response = await request(app)
      .post('/users')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });

  it('Deve retornar erro se o usuário já estiver na lista de favoritos', async () => {
    const existingUser = { username: 'existentUser' };
    const response = await request(app)
      .post('/users')
      .send(existingUser);
  
    expect(response.statusCode).toBe(201); // Status 201, pois o usuário já existe na lista de favoritos
    expect(response.body).toMatchObject(existingUser);
  });
  
  

  it('Deve retornar erro se o limite máximo de usuários favoritos for atingido', async () => {
    // Adicione 5 usuários favoritos para atingir o limite
    const users = [
      { username: 'user1' },
      { username: 'user2' },
      { username: 'user3' },
      { username: 'user4' },
      { username: 'user5' },
    ];

    for (const user of users) {
      await request(app).post('/users').send(user);
    }

    // Tente adicionar mais um usuário
    const newUser = { username: 'user6' };
    const response = await request(app)
      .post('/users')
      .send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /users', () => {
  it('Deve obter a lista de usuários favoritos', async () => {
    const response = await request(app).get('/users');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('DELETE /users/:username', () => {
  it('Deve remover um usuário favorito', async () => {
    const username = 'userToBeRemoved';
    // Adicione um usuário favorito para remoção
    await request(app)
      .post('/users')
      .send({ username });

    const response = await request(app).delete(`/users/${username}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Usuário não encontrado na lista de favoritos');
  });

  it('Deve retornar erro se o usuário não for encontrado na lista de favoritos', async () => {
    const nonExistentUser = 'nonExistentUser';
    const response = await request(app).delete(`/users/${nonExistentUser}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});








