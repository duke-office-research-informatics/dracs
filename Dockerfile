FROM node:8-alpine

EXPOSE 9001
ENV APP_ROOT=/opt/app-root/src
ARG NODE_ENV=development

RUN mkdir -p ${APP_ROOT} && \
    apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ADD . ${APP_ROOT}

WORKDIR ${APP_ROOT}

RUN NODE_ENV=${NODE_ENV} npm install

RUN chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT}

run mkdir /tmp/.npm
run npm config set cache /tmp/.npm --global
run chown -R 1001:0 /tmp/.npm

# lifted centos/nodejs s2i builder fix_permissions script
RUN find -L "${APP_ROOT}" -user 1001 \! -group 0 -exec chgrp 0 {} + && \
    find -L "${APP_ROOT}" -user 1001 \! -perm -g+rw -exec chmod g+rw {} + && \
    find -L "${APP_ROOT}" -user 1001 -perm /u+x -a \! -perm /g+x -exec chmod g+x {} + && \
    find -L "${APP_ROOT}" -user 1001 -type d \! -perm /g+x -exec chmod g+x {} +

USER 1001
CMD npm run storybook
