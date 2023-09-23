FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]
