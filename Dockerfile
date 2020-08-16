##### STAGE 1: Build
FROM node:latest-alpine AS node
LABEL author = "Shabbir Hussain Bohra"
WORKDIR /sites
COPY . .
RUN npm install
RUN npm run build-ops:master

##### STAGE 2: Setup
FROM nginx:1.14.1-alpine
VOLUME /var/cache/nginx
COPY --from=node dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

