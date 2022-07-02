FROM shadowsocks/shadowsocks-libev:latest
COPY config.json /etc/shadowsocks-libev/config.json
RUN ls /etc -l

RUN date
