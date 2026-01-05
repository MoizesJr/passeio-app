# Estágio de Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# O comando build do Angular 17+ já gera a pasta browser por padrão em produção
RUN npm run build

FROM nginx:alpine
# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# IMPORTANTE: Verifique se o nome da pasta é exatamente 'passeio-app' 
# Se o build falhar no Render, verifique o nome no angular.json
COPY --from=build /app/dist/passeio-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]