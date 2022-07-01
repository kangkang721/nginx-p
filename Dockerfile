FROM nginx:alpine
COPY site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
RUN cat /etc/nginx/conf.d/nginx.conf
