FROM node:18.16
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@latest
RUN npm i -f
COPY . .
RUN npm run build -f  # enable for NextJS only
EXPOSE 3000
CMD ["npm", "start"]
