# Node.js image get
FROM node:16 as build

# for tar file directory
RUN mkdir /Frontend

WORKDIR /Frontend

COPY ./package.json ./package-lock.json ./

# install dependency for application
RUN npm install

COPY . .

# build React application
RUN npm run build

# set Runtime image
FROM nginx:latest

# copy build react app file to nginx static file directory
COPY --from=build /Frontend/build /usr/share/nginx/html

# 도커 상의 엔진엑스에 컨피그 파일 입히기
COPY front.conf /etc/nginx/conf.d/default.conf

# RUN React Application
CMD ["nginx", "-g", "daemon off;"]
