FROM node:12.18-alpine3.9

WORKDIR /usr/src/labels-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]