FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . ./app

CMD ["pnpm", "run", "dev"]
