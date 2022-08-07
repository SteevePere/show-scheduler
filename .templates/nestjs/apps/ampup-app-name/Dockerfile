FROM node:14-alpine as builder

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY libs/shared/package.json ./libs/shared/package.json

COPY apps/scheduler-app-name/patches ./apps/scheduler-app-name/patches
COPY apps/scheduler-app-name/package.json ./apps/scheduler-app-name/package.json

RUN ls

RUN yarn install --quiet --frozen-lockfile
RUN yarn lerna bootstrap

COPY . .

ENV NODE_ENV=production

RUN yarn build --scope=@scheduler/shared

WORKDIR /usr/app/apps/scheduler-app-name

RUN yarn build

EXPOSE 80
CMD yarn node dist/main
