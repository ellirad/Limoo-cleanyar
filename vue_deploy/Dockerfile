FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ["npm", "run" , "build"]

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY vue_deploy/vue.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
COPY --from=0 /usr/src/app/dist .
EXPOSE 80

