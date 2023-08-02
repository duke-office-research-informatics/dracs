FROM node:16-alpine

EXPOSE 9001
ENV APP_ROOT=/opt/app-root/src
ARG NODE_ENV=development

RUN mkdir -p ${APP_ROOT} && \
    apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ADD . ${APP_ROOT}

WORKDIR ${APP_ROOT}

RUN NODE_ENV=${NODE_ENV} npm install

CMD npm run storybook
