#
# BUILD FOR PRODUCTION
#
FROM node:21 AS builder
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

#
# NODE_MODULES
#
FROM node:21 AS modules
COPY package.json yarn.lock ./

RUN yarn install --prod

#
# PRODUCTION
#
FROM node:21

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder dist /usr/src/app/dist
COPY --from=modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

CMD [ "yarn", "start:prod" ]
