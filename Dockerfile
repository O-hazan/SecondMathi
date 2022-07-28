FROM nginx

EXPOSE 8080

COPY ./build/ /usr/share/nginx/html


# FROM node:7.7.2-alpine
# WORKDIR /app
# ADD . /app
# RUN npm install
# RUN npm install -g serve
# EXPOSE 3000
# RUN serve


