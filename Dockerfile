FROM node:14
COPY config.json /etc/shadowsocks-libev/config.json
RUN ls /etc -l

RUN date
