FROM node:18.16
WORKDIR /app
RUN mkdir /app/pages
COPY package.json ./
RUN npm i -g npm@latest
COPY . .
RUN yarn install && yarn build
EXPOSE 3000
CMD ["yarn", "start"]
