FROM nginx:alpine
COPY site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
RUN ls /etc/nginx
RUN cat /etc/nginx/nginx.conf
