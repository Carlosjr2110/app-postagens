
## Description

Back-end para app de postagens

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)


## Project setup

```bash
$ npm install
```
## Build e start containers
```bash
$ docker-compose up
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🔗 Endpoints

- **GET** `/posts` → Retorna todas as postagens
- **POST** `/posts` → Cria uma nova postagem
- **PUT** `/posts/:id` → Atualiza uma postagem existente
- **DELETE** `/posts/:id` → Remove uma postagem
- **SEARCH** `/posts/search` → Busca por palavra chave


> Para testar os endpoints, use **Insomnia**, **Postman** ou `curl`.

```bash
curl http://localhost:3000/posts
```




