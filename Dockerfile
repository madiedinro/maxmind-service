FROM node:9.9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install --production
RUN yarn global add pino


COPY . /usr/src/app

RUN ./update_db

# Env vars
ENV TZ UTC
ENV NODE_ENV production

EXPOSE 8080

CMD [ "yarn", "start" ]
