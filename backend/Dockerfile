FROM node:lts-alpine
WORKDIR /app

COPY yarn.lock ./
COPY package.json ./
RUN yarn install --production
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]