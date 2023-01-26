# Project setup

## Technologies
- @fastify
- @nestjs/axios
- @nestjs/mongoose
- @nestjs/schedule
- @nestjs/swagger
- "stream-chain"
- "stream-json"

## Scripts
- "build": "nest build",
- "start": "nest start",
- "start:dev": "nest start --watch",
- "start:prod": "node dist/main",

## Docker
Para construir a imagem:
docker-compose build

Para iniciar o container:
docker-compose up

## Dockerfile
O Dockerfile deste projeto foi configurado para criar dois contêineres: um para realizar o build da aplicação e outro para rodar apenas o build gerado, diminuindo assim o tamanho da imagem final.

## Environment Variables
As seguintes variáveis de ambiente precisam ser definidas:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=openfoodfacts
CRON_INTERVAL=0 0 * * *
```
Certifique-se de ter as seguintes variáveis de ambiente definidas antes de executar a aplicação


## Database
Este projeto requer duas coleções no banco de dados: "histories" e "products".

## API documentation
A documentação API está disponível em http://localhost:3000/api# quando a aplicação está em execução.