FROM nginx:alpine
COPY site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ls /etc/nginx/conf.d
RUN cat /etc/nginx/nginx.conf
