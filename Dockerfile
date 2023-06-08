FROM node:18.16
WORKDIR /app
RUN mkdir /app/pages
COPY package.json ./
RUN npm i -g npm@latest
RUN yarn install --production && yarn build
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
