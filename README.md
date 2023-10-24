# Desafio Puma - Aplicação de Favoritos

## Visão Geral

Este projeto é uma aplicação de exemplo que permite aos usuários gerenciar uma lista de usuários favoritos. Foi implementado com uma parte do frontend desenvolvida em React e a parte do backend em Node.js com o framework Express.

## Funcionalidades

- Adicionar um usuário à lista de favoritos.
- Listar os usuários favoritos.
- Remover um usuário da lista de favoritos.
- Marcar um usuário com uma estrela 

## Tecnologias Utilizadas

- Frontend: React
- Backend: Node.js, Express
- Testes: Jest, Supertest

## Como Executar

Para executar a aplicação, siga estas etapas:

### Frontend (React)

1. Clone o projeto  
git clone https://github.com/Leofbrgs/Desafio.git


2. Navegue até o diretório frontend:

cd Desafio-puma/frontend/front-desafio

3.Instale as dependências:

sudo apt install npm
npm install react

4. Inicie o servidor de desenvolvimento:

npm start


### Backend (Node.js com express)

1. Navegue até o diretório frontend:

   cd Desafio-puma/backend

2.Instale as dependências:

npm install node

4. Inicie o servidor de desenvolvimento:

node index.js

O servidor Express será executado na porta 3000.

Agora, você pode acessar o aplicativo em seu navegador no endereço http://localhost:3000.

### Testes

Os testes para a aplicação estão implementados usando o framework Jest e a biblioteca Supertest.

Para executar os testes, siga estas etapas:

1.Navegue até o diretório backend:
    cd Desafio-puma/backend

2. Instale
npm install --save-dev jest
npm install --save-dev supertest


3.Execute o comando de teste na pasta do back:
    npx jest

Isso executará os testes automatizados e fornecerá os resultados.
Autor

Leonardo Borges