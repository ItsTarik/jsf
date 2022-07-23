FROM node:16.15.1-alpine

WORKDIR /front
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

RUN yarn build
RUN rm -rf node_modules
RUN yarn --frozen-lockfile --production


CMD ["yarn", "start"]