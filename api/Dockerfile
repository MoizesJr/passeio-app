FROM node:22-alpine

WORKDIR /app

RUN npm install -g json-server@0.17.4

COPY ./db.production.json .
COPY ./middleware.js .

EXPOSE 4000

# ADICIONE O FINAL: "--middlewares", "middleware.js"
ENTRYPOINT ["json-server", "--watch", "db.production.json", "--host", "0.0.0.0", "--port", "4000", "--middlewares", "middleware.js"]