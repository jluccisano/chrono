FROM nginx
RUN apt-get update \
  && apt-get -y install unzip
ADD dist/chrono.zip  /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN unzip -o chrono.zip \
  && rm chrono.zip
