FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install
# dont copy everything / check dockerignore mechanics
COPY . .
EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev"]