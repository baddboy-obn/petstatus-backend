FROM node:14-slim

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

CMD ['yarn', 'start:prod']
