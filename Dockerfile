FROM shadowsocks/shadowsocks-libev:latest
COPY config.json /etc/shadowsocks-libev/config.json

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN ls /etc -l

RUN date
