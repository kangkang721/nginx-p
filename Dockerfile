FROM shadowsocks/shadowsocks-libev:latest
COPY config.json /etc/shadowsocks-libev/config.json

ENV TZ=Asia/Shanghai
 
RUN apk update \
    && apk add tzdata \
    && echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm /var/cache/apk/*

RUN ls /etc -l

RUN date
