FROM node:10.16.1
ENV LANG C.UTF-8

RUN mkdir /app
ENV APP_ROOT /app
WORKDIR $APP_ROOT

RUN apt-get update \
    && apt-get install -y \
        iputils-ping \
        net-tools \
        libnss3 \
        libgtk-3-0 \
        libxss1 \
        libasound2 \
        x11-apps

ADD . $APP_ROOT
