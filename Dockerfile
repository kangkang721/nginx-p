FROM v2ray/official:latest

COPY config.json /etc/v2ray/config.json

RUN ls /etc/v2ray
