FROM ubuntu:14.04

RUN apt-get update
RUN apt-get -y install curl
RUN apt-get -y install build-essential
RUN curl https://install.meteor.com/ | sh

RUN curl -sL https://deb.nodesource.com/setup_0.10 | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y python

COPY . /src

RUN (cd /src && meteor build /build --directory  --verbose)

WORKDIR /build/bundle

RUN (cd programs/server && npm install)
CMD node main.js

