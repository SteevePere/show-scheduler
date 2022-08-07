FROM node:14-alpine as builder

WORKDIR /usr/app

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" 0B85F091-92F0-44E1-B227-F6448244C33A

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY libs/shared/package.json ./libs/shared/package.json
COPY libs/cdk/package.json ./libs/cdk/package.json

# COPY apps/scheduler-api/patches ./apps/scheduler-api/patches
COPY apps/scheduler-app/package.json ./apps/scheduler-app/package.json

RUN yarn install --quiet --frozen-lockfile
RUN yarn lerna bootstrap

COPY . .

ENV NODE_ENV=production

RUN yarn build --scope=@scheduler/shared
RUN yarn build --scope=@scheduler/cdk

WORKDIR /usr/app/apps/scheduler-app

RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=builder /usr/app/apps/scheduler-app/build /usr/share/nginx/html
COPY --from=builder /usr/app/apps/scheduler-app/.env.dist /usr/share/nginx/html/.env

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/apps/scheduler-app/docker/nginx.config /etc/nginx/nginx.conf
COPY --from=builder /usr/app/apps/scheduler-app/docker/default.config /etc/nginx/conf.d/default.conf

# install nodejs & npm
RUN apk add --update nodejs
RUN apk add --update npm

# install runtime-env-cra package
RUN npm i -g runtime-env-cra

WORKDIR /usr/share/nginx/html

EXPOSE 80
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]

