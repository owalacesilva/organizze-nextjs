FROM node:18 as build

WORKDIR /app

RUN apt update && apt install -y curl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install angular cli
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project
CMD ["npm", "run", "start"]