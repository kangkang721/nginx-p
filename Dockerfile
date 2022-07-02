FROM node:14

ADD ./code /code
WORKDIR /code
RUN npm install bencode

CMD node index.js


EXPOSE 3000
