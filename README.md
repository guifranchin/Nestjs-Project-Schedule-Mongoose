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
To build the image:
docker build -t codesh/guilherme .

To run the container:
docker run -p 3000:3000 -it codesh/guilherme

## Dockerfile
The Dockerfile uses two FROM statements to separate the build process from the final image. The first FROM runs the command npm run build and the second FROM copies only the generated build files, reducing the image size.

## Environment Variables
The following environment variables need to be set:

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@localhost:1322/openfoodfacts
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=openfoodfacts
CRON_INTERVAL=0 0 * * *

## Database
This project requires two collections in the database: "histories" and "products".

## API documentation
The API documentation is available at http://localhost:3000/api# when the application is running.