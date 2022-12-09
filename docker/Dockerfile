FROM nginx:1.23.1
RUN apt-get update && apt-get install -y locales tzdata \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen && apt-get clean
ENV TZ=Europe/Moscow
ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU:ru
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY ./storybook-static /var/www
CMD ["nginx", "-g", "daemon off;"]
