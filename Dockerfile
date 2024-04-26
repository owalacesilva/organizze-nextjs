FROM node:18 as build

WORKDIR /app

RUN apt update && apt install -y curl

# COPY package.json package-lock.json

RUN npm install -g @angular/cli
RUN npm install

COPY . .

CMD ["npm", "run", "start"]