FROM shadowsocks/shadowsocks-libev:latest
COPY config.json /etc/shadowsocks-libev/config.json

RUN ls /etc -l

RUN date -s 11/03/2009
