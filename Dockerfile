FROM node:14
ADD . /code
WORKDIR /code
EXPOSE 3000
CMD node index.js
RUN date
