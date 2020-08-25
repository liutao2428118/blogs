FROM node:10.16.3
LABEL maintainer="tao.lt liutao2428118@163.com"
COPY . /app
WORKDIR /app
RUN npm i --registry=https://registry.npm.taobao.org && npm run build:client && npm run build:server
CMD npm run start