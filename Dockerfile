FROM node:12.16.2
LABEL maintainer="tao.lt liutao2428118@163.com"
COPY . /app
WORKDIR /app
RUN npm i --registry=https://registry.npm.taobao.org && npm run build:client && npm run build:server
EXPOSE 3000
CMD npm run start