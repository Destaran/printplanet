FROM node:20
WORKDIR /backend

RUN ["npm", "install", "yarn"]

COPY package.json /backend
COPY yarn.lock /backend

RUN ["yarn"]
COPY start.sh /backend
COPY nest-cli.json /backend
COPY tsconfig.json /backend
COPY tsconfig.build.json /backend
COPY .prettierrc /backend 
COPY .eslintrc.js /backend
COPY seeding /backend
COPY src /backend
COPY test /backend
# COPY vitest.config.mts /backend
# COPY .prettierignore /backend
# COPY .swcrc /backend
# COPY test_assets /backend

ENTRYPOINT ["./start.sh"]
