FROM node:14
ADD ./code /code
WORKDIR /code
EXPOSE 3000
CMD node index.js
RUN ls /code
