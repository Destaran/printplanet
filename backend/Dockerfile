FROM node:20 as base

# RUN npm install -g yarn@1.22.19

FROM base as builder

WORKDIR /backend

COPY package.json /backend
COPY yarn.lock /backend

RUN yarn

FROM builder as source

COPY start.sh /backend
COPY nest-cli.json /backend
COPY tsconfig.json /backend
COPY tsconfig.build.json /backend
COPY .prettierrc /backend 
COPY .eslintrc.js /backend
COPY seeding /backend
COPY src /backend
COPY test /backend

FROM source as dev

CMD ["yarn", "start:dev"]
